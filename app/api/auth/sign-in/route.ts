import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/db';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new NextResponse('email and password are required', {
                status: 400,
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return new NextResponse('Invalid credentials', {
                status: 401,
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password!
        );

        if (!isPasswordMatched) {
            return new NextResponse('Invalid credentials', {
                status: 401,
            });
        }
        return new NextResponse(
            JSON.stringify({
                id: user.id,
                email: user.email,
                username: user.username,
                image: user.image,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new NextResponse('Internal server error', {
            status: 500,
        });
    }
};
