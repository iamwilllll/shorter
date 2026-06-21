export type UrlT = {
    id: string;
    label: string;
    originalUrl: string;
    createdAt: Date;
    clicks: number;
    uniqueClicks: string[];
};

export type CreateUrlT = Omit<UrlT, 'id' | 'createdAt' | 'clicks' | 'uniqueClicks'>;

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

export type NewUrlT = {
    id: string;
    uid?: string;
    label: string;
    originalUrl: string;
    createdAt: Date;
    clicks: number;
    uniqueClicks: string[];
};
