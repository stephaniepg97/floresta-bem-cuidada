import { ResultFetchApi } from "./ResultFetchApi"
import { RouteComponentProps } from "./RouteComponentProps";

export type LoginProps = RouteComponentProps &  {
    login: ({ username, password }: {
        username: string | undefined;
        password: string | undefined;
    }) => Promise<ResultFetchApi>;
    me: (_token: string | null | undefined) => Promise<ResultFetchApi>;
}