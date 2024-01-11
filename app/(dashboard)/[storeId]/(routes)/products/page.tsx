import { format } from 'date-fns';
import { ProductsClient } from './components/client';
import prismadb from '@/lib/prismadb';
import { ProductColumn } from './components/columns';
import { formatter } from '@/lib/utils';
const ProductPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const product = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },

        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    const formattedProducts: ProductColumn[] = product.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        quantity: item.quantity,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-cols">
            <div className=" flex-1 space-y-4  p-8 pt-6">
                <ProductsClient data={formattedProducts} />
            </div>
        </div>
    );
};

export default ProductPage;
