export interface AuthUserModel {
    email: string;
    jwt: JsonWebToken;
}

interface JsonWebToken {
    accessToken: string;
    expires: number;
}