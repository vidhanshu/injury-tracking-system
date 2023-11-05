import { User } from '@prisma/client';
import { createContext } from 'react';

export const AuthContext = createContext<{
    user: null | User;
}>({ user: null });
