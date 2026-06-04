import { create } from 'zustand';
import type { ShortUrlT } from '../types';

type UrlsT = {
    urls: ShortUrlT[];
    setUrls: (urls: ShortUrlT[]) => void;
};

export const useUrls = create<UrlsT>()((set) => ({
    urls: [],
    setUrls: (urls: ShortUrlT[]) => set(() => ({ urls })),
}));
