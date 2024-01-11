import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
    {
        params,
    }: {
        params: {
            storeId: string;
        };
    },
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived, quantity } = body;
        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 403 });
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 });
        }
        if (!price) {
            return new NextResponse('Price is required', { status: 400 });
        }
        if (!quantity) {
            return new NextResponse('Quantity is required', { status: 400 });
        }
        if (!categoryId) {
            return new NextResponse('CategoryId is required', { status: 400 });
        }
        if (!colorId) {
            return new NextResponse('ColorId is required', { status: 400 });
        }
        if (!sizeId) {
            return new NextResponse('SizeId is required', { status: 400 });
        }
        if (!images || !images.length) {
            return new NextResponse('Images is required', { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse('Stored ID is required', { status: 400 });
        }
        const storeByYourId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByYourId) {
            return new NextResponse('Unauthorized', { status: 405 });
        }

        const products = await prismadb.product.create({
            data: {
                storeId: params.storeId,
                name,
                price,
                quantity,
                categoryId,
                colorId,
                sizeId,

                isFeatured,
                isArchived,

                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)],
                    },
                },
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { searchParams } = new URL(req.url);

        const categoryId = searchParams.get('categoryId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
