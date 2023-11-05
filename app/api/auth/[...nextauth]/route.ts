import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import prisma from '@/prisma/db';

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'name@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                try {
                    // login the user
                    const res = await axios.post(
                        'http://localhost:3000/api/auth/sign-in',
                        {
                            email: credentials.email,
                            password: credentials.password,
                        }
                    );
                    const user = res.data;

                    if (!user) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async signIn({ account, profile }: any) {
            /**
             * if user sign in/up using google we should check if user already exists,
             * if doesn't exists we should create new user
             * we aren't keeping password field mandatory in User modal because google doesn't provide password
             */
            if (account?.provider === 'google') {
                const user = await prisma.user.findUnique({
                    where: {
                        email: profile!.email,
                    },
                });

                if (!user) {
                    await prisma.user.create({
                        data: {
                            email: profile!.email,
                            image: profile!.image,
                        },
                    });
                }
                if (user) {
                    await prisma.user.update({
                        where: {
                            email: profile!.email,
                        },
                        data: {
                            image: profile!.image,
                        },
                    });
                }
            }
            return true;
        },
    },
});

export { handler as GET, handler as POST };
