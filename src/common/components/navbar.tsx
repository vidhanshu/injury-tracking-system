'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { LogIn } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Container from './container';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: <Link href="/">Profile</Link>,
    },
    {
        key: '2',
        label: <a href="/api/auth/logout">Log out</a>,
    },
];

const Navbar = () => {
    const { isLoading, user } = useUser();

    return (
        <nav className="border-b py-2">
            <Container className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/images/logo-name.svg"
                        alt="logo"
                        width={200}
                        height={50}
                    />
                </Link>

                <div>
                    {isLoading ? (
                        <>
                            <div className="animate-pulse bg-gray-300 h-10 w-20 rounded-lg" />
                        </>
                    ) : user ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden relative cursor-pointer">
                            <Dropdown menu={{ items }}>
                                {user.picture ? (
                                    <Image
                                        src={user.picture}
                                        fill
                                        alt="profile-picture"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-300">
                                        {user.email && user.email[0]}
                                    </div>
                                )}
                            </Dropdown>
                        </div>
                    ) : (
                        <Link href="/api/auth/login">
                            <Button
                                size="large"
                                icon={
                                    <LogIn className="w-4 h-4 text-[#00aeab]" />
                                }
                            >
                                Sign in
                            </Button>
                        </Link>
                    )}
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
