export type ShortUrlT = {
    id: string;
    label: string;
    originalUrl: string;
    createdAt: Date;
};

export type CreateShortUrlT = Omit<ShortUrlT, 'createdAt' | 'id'>;
