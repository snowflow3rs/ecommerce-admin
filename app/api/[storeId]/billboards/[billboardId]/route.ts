import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
    try {
        if (!params.billboardId) {
            return new NextResponse('BillboardId is required', { status: 400 });
        }
        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, imageUrl } = body;
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        if (!label) {
            return new NextResponse('label is required', { status: 400 });
        }
        if (!imageUrl) {
            return new NextResponse('imageUrl is required', { status: 400 });
        }
        if (!params.billboardId) {
            return new NextResponse('BillboardId is required', { status: 400 });
        }

        const storeByYourId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByYourId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }
        const billboard = await prismadb.billboard.update({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl,
            },
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        const storeByYourId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByYourId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }
        if (!params.billboardId) {
            return new NextResponse('BillboardId is required', { status: 400 });
        }
        const billboard = await prismadb.billboard.delete({
            where: {
                id: params.billboardId,
            },
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
