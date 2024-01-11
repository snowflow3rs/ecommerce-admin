import BillboardsForm from '@/components/form/BillboardForm';
import prismadb from '@/lib/prismadb';
import React from 'react';

const BillboardsPage = async ({
    params,
}: {
    params: {
        billboardId: string;
    };
}) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId,
        },
    });
    return (
        <div className="flex-cols">
            <div className="flex-1  space-y-4 p-8 pt-6">
                <BillboardsForm initialData={billboard} />
            </div>
        </div>
    );
};

export default BillboardsPage;
