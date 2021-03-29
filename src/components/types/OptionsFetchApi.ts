import { AuthBody } from "../models/AuthBody";
import { OpenPlatformBody } from "../models/OpenPlatformBody";

export type OptionsFetchApi = Omit<RequestInit, 'body'> & {
    route: string, 
    contentType?: 'application/json' | 'text/plain' | 'application/x-www-form-urlencoded', 
    _token?: string | null,
    body?: AuthBody | OpenPlatformBody | string
};