export type ResultFetchApi = {
    status: boolean;
    statusCode: number;
    statusMessage: string | null;
} & ({
    response: Response | any | string;
    error?: undefined;
} | {
    error: {
        response?: Response | any | string;
    } | null;
    response?: undefined;
});