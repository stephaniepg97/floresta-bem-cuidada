import { AuthBody } from "./AuthBody";

export interface OpenPlatformBody extends Omit<AuthBody, 'grant_type'> {
    ServerDB?: string;
    UserDB?: string;
    PasswordDB?: string;
}