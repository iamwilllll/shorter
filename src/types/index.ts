export type ShortUrlT = {
    id: string;
    label: string;
    originalUrl: string;
    createdAt: Date;
};

export type CreateShortUrlT = Omit<ShortUrlT, 'createdAt' | 'id'>;

export type LoginFormT = {
    email: string;
    password: string;
};
