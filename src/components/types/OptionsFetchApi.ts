import { AuthBody } from "../models/AuthBody";
import { InternalDocument } from "../models/InternalDocument";
import { OpenPlatformBody } from "../models/OpenPlatformBody";
import { PurchaseDocument } from "../models/PurchaseDocument";

export type OptionsFetchApi = Omit<RequestInit, 'body'> & {
    route: string, 
    contentType?: 'application/json' | 'text/plain' | 'application/x-www-form-urlencoded', 
    _token?: string | null,
    body?: AuthBody | OpenPlatformBody | InternalDocument | PurchaseDocument | string
};