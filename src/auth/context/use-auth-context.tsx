import { useContext } from 'react';
import { AuthContext } from './auth-context';

export default function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}
