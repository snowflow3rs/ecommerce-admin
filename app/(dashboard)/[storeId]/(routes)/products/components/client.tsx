'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ProductColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';
interface ProductsClientProps {
    data: ProductColumn[];
}
export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Product (${data.length})`} description="Manage products for your store" />

                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />

            <Heading title="API" description="API calls for products" />
            <Separator />

            <ApiList entityName="products" entityIdName="productId" />
        </>
    );
};
