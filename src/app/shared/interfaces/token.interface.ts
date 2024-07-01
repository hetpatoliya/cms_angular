export interface IToken {
    accessToken: string | null
}

export interface TokenUser {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: number;
}