import ColorForm from '@/components/form/ColorForm';
import prismadb from '@/lib/prismadb';
import React from 'react';

const ColorPage = async ({
    params,
}: {
    params: {
        colorId: string;
    };
}) => {
    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId,
        },
    });
    return (
        <div className="flex-cols">
            <div className="flex-1  space-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>
    );
};

export default ColorPage;
