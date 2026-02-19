import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../../../lib/types';

// Mock users for demo
const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao@vocedigital.com',
        role: 'vendor',
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@vocedigital.com',
        role: 'vendor',
    },
];

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: false,

            login: async (email: string, _password: string) => {
                set({ loading: true });

                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 800));

                const user = MOCK_USERS.find((u) => u.email === email);

                if (user) {
                    set({ user, isAuthenticated: true, loading: false });
                } else {
                    set({ loading: false });
                    throw new Error('Credenciais inválidas');
                }
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            checkAuth: () => {
                // This is called on app mount to restore auth state from localStorage
                // The persist middleware handles this automatically
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
