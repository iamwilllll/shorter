export type ShortUrlT = {
    id: string;
    label: string;
    originalUrl: string;
    createdAt: string;
};

export type CreateShortUrlT = Omit<ShortUrlT, 'createdAt' | 'id'>;
