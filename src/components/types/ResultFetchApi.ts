export type ResultFetchApi = {
    response: Response | any;
    error: {
        status?: number;
        message?: string | null;
    } | null;
};