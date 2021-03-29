import { Model } from "./Model"

export interface User extends Model {
    Username: string;
    Password: string;
    Nome?: string;
    Email?: string;
}