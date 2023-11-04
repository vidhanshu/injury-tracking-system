'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface AuthSessionProviderProps {
    children: ReactNode;
}

const AuthSessionProvider: FC<AuthSessionProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
