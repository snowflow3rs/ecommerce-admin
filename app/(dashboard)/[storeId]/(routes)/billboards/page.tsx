import { format } from 'date-fns';
import { BillboardsClient } from './components/client';
import prismadb from '@/lib/prismadb';
import { BillboardColumn } from './components/columns';

const BillboardsPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const billboard = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    const formatBillboards: BillboardColumn[] = billboard.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-cols">
            <div className=" flex-1 space-y-4  p-8 pt-6">
                <BillboardsClient data={formatBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
