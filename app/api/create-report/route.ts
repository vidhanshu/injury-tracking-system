import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, name, date, map, reporterName } = body;
        if (!email || !date || !map) {
            return new NextResponse('reporterId, map & date are required', {
                status: 400,
            });
        }

        const reporter = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        const report = await prisma.report.create({
            data: {
                date,
                name,
                bodyMap: {
                    create: {
                        map,
                    },
                },
                reporterName,
                reporterId: reporter?.id!,
            },
            include: {
                reporter: true,
                bodyMap: true,
            },
        });

        return new NextResponse(JSON.stringify(report), {
            status: 201,
        });
    } catch (error) {
        console.log('[REPORT CREATION ERROR]', error);
        return new NextResponse('Internal server error', {
            status: 500,
        });
    }
};
