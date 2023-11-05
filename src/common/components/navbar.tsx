'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { useSession } from 'next-auth/react';
import { Clipboard, LogIn } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { signIn, signOut } from 'next-auth/react';

import Container from './container';
import { useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: <Link href="/create-report">Create</Link>,
    },
    {
        key: '2',
        label: <button onClick={() => signOut()}>Log out</button>,
    },
];

const Navbar = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const isDownMd = useMediaQuery('(max-width: 768px)');

    return (
        <nav className="border-b py-2 sticky top-0 bg-white z-50">
            <Container className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/images/logo-name.svg"
                        alt="logo"
                        width={200}
                        height={50}
                    />
                </Link>

                <div className="flex gap-x-4 items-center">
                    <Button
                        type="primary"
                        size="large"
                        icon={<Clipboard className="w-4 h-4 text-white" />}
                        onClick={() => router.push('/view-reports')}
                    >
                        {isDownMd ? '' : 'Reports'}
                    </Button>
                    {status === 'loading' ? (
                        <>
                            <div className="animate-pulse bg-gray-300 h-10 w-20 rounded-lg" />
                        </>
                    ) : session && session.user ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden relative cursor-pointer border">
                            <Dropdown menu={{ items }}>
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        fill
                                        alt="profile-picture"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex justify-center items-center">
                                        {session.user.email &&
                                            session.user.email[0]}
                                    </div>
                                )}
                            </Dropdown>
                        </div>
                    ) : (
                        <Button
                            size="large"
                            icon={<LogIn className="w-4 h-4 text-[#00aeab]" />}
                            onClick={() => signIn()}
                        >
                            {isDownMd ? '' : 'Log in'}
                        </Button>
                    )}
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
