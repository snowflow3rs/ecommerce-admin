'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { BillboardColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';
interface BillboardsClientProps {
    data: BillboardColumn[];
}
export const BillboardsClient: React.FC<BillboardsClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboard (${data.length})`} description="Manage billboards for your store" />

                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />

            <Heading title="API" description="API calls for billboards" />
            <Separator />

            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    );
};
