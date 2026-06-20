export type UrlT = {
    id: string;
    label: string;
    originalUrl: string;
    createdAt: Date;
};

export type CreateUrlT = Omit<UrlT, 'createdAt' | 'id'>;

export type SigninFormT = {
    email: string;
    password: string;
};

export type SignupFormT = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};
