import { AuthBody } from "../models/AuthBody";
import { User } from "../models/User";
import { ResultFetchApi } from "./ResultFetchApi"
import { RouteComponentProps } from "react-router";
import { AppRouteProps } from "./AppRouteProps";

export type LoginProps = RouteComponentProps & {
    login: (_ : AuthBody & { 
        logIn?: () => void;
      }) => Promise<ResultFetchApi>
    me: (_token: string | null) => Promise<[User | null, ResultFetchApi]>
} & Pick<AppRouteProps, 'keyId'>