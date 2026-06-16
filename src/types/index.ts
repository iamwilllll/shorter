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

export type SignupFormT = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};
