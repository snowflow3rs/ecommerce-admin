import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { colorId: string } }) {
    try {
        if (!params.colorId) {
            return new NextResponse('ColorId is required', { status: 400 });
        }
        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            },
        });
        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLORS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string; colorId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 });
        }
        if (!value) {
            return new NextResponse('Value is required', { status: 400 });
        }
        if (!params.colorId) {
            return new NextResponse('ColorId is required', { status: 400 });
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
        const colors = await prismadb.color.update({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value,
            },
        });
        return NextResponse.json(colors);
    } catch (error) {
        console.log('[COLORS_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; colorId: string } }) {
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
        if (!params.colorId) {
            return new NextResponse('ColorId is required', { status: 400 });
        }
        const colors = await prismadb.color.delete({
            where: {
                id: params.colorId,
            },
        });
        return NextResponse.json(colors);
    } catch (error) {
        console.log('[COLORS_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
