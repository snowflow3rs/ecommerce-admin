import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { OrderColumn } from './components/columns';
import { OrderClient } from './components/client';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => {
        console.log('Order Items Data:', item.orderItems); // Add this line to log orderItems data

        return {
            id: item.id,
            phone: item.phone,
            address: item.address,
            products: item.orderItems
                .map((orderItem) => {
                    const productName = orderItem.product.name;
                    const productQuantity = orderItem.orderQuantity;

                    return `${productName} (${productQuantity})`; // Display product name along with its quantity
                })
                .join(', '),
            totalQuantity: item.orderItems.reduce((total, orderItem) => total + orderItem.orderQuantity, 0),
            totalPrice: formatter.format(
                item.orderItems.reduce((total, orderItem) => {
                    return total + Number(orderItem.product.price) * orderItem.orderQuantity;
                    // ^ Adjust the calculation based on orderQuantity
                }, 0),
            ),
            isPaid: item.isPaid,
            createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        };
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;
