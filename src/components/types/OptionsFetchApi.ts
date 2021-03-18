export type OptionsFetchApi = RequestInit & {
    route: string | undefined, 
    contentType?: 'application/json' | 'text/plain' | 'application/x-www-form-urlencoded', 
    _token?: string | null,
};