export type ShortUrlT = {
    label: string;
    originalUrl: string;
    createdAt: string;
};

export type CreateShortUrlT = Omit<ShortUrlT, 'createdAt'>;
