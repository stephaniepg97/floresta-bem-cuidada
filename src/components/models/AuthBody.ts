import { User } from "./User";

export interface AuthBody extends Pick<User, 'Username' | 'Password'> {
    Company?: string;
    Line?: string;
    Instance: string;
    grant_type: string;
}