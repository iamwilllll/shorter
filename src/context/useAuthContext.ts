import { createContext } from 'react';
import type { User } from 'firebase/auth';

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
