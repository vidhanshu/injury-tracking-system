import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) {
            return new NextResponse('email and password are required', {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return new NextResponse(
            JSON.stringify({
                id: user.id,
                email: user.email,
                image: user.image,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }),
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log('[SIGN UP ERROR]', error);
        return new NextResponse('Internal server error', {
            status: 500,
        });
    }
};
