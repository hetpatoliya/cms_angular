import { IToken, TokenUser } from "src/app/shared/interfaces/token.interface";

export class TokenService {

    constructor() { }

    setToken(tokens: IToken) {
        sessionStorage.setItem('token', JSON.stringify(tokens));
    }

    getToken(): IToken {
        return { accessToken: sessionStorage.getItem('token') };
    }

    setCurrentUser(userDetail: TokenUser) {
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify(userDetail));
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user') ?? '{}');
    }
}