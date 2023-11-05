'use client';

import React, { useEffect, useState } from 'react';

import { User } from '@prisma/client';
import { AuthContext } from './auth-context';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<null | User>(null);

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await fetch('/api/auth/get-me');
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };
        getMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
