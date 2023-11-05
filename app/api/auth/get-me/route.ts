import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const session = await getServerSession();
    try {
        if (!session) {
            return new NextResponse('Your not logged in', {
                status: 401
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email!,
            },
        });

        return new NextResponse(JSON.stringify(user), {
            status: 200,
        });
    } catch (err) {
        return new NextResponse('Internal server error', {
            status: 500,
        });
    }
};
