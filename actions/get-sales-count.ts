import prismadb from '@/lib/prismadb';

export const getSalesCount = async (storeId: string) => {
    const getSalesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true,
        },
    });
    return getSalesCount;
};
