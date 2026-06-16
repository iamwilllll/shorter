import { create } from 'zustand';

type LoadingT = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export const useLoading = create<LoadingT>()((set) => ({
    loading: false,
    setLoading: (loading: boolean) => set(() => ({ loading })),
}));
