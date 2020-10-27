export interface AuthUserModel {
    email: string;
    jwt: JsonWebToken;
}

export interface JsonWebToken {
    accessToken: string;
    expiresInMinutes: number;
    expiresOnServer: number;
    expiresOnClient: number;
}