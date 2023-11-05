import prisma from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) => {
    try {
        const body = await req.json();
        const {
            map: { id, data },
            reporterName,
            name,
            date,
            email,
        } = body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) return new NextResponse('User not found', { status: 404 });

        const report = await prisma.report.update({
            where: {
                id: Number(id),
            },
            data: {
                reporterName,
                name,
                date,
                bodyMap: {
                    update: {
                        where: {
                            id,
                        },
                        data: {
                            map: data,
                        },
                    },
                },
            },
        });

        return new NextResponse(JSON.stringify(report), {
            status: 200,
        });
    } catch (error) {
        console.log('[REPORT EDITION ERROR]', error);
        return new NextResponse('Internal server error', {
            status: 500,
        });
    }
};
