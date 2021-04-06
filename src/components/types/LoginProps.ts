import { AuthBody } from "../models/AuthBody";
import { User } from "../models/User";
import { ResultFetchApi } from "./ResultFetchApi"

export type LoginProps = {
    login: (_ : AuthBody & { 
        logIn?: () => void;
      }) => Promise<ResultFetchApi>;  
    me: (_token: string | null) => Promise<[User | null, ResultFetchApi]>;
    keyId: string;
}