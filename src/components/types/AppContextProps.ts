import { ResultFetchApi } from "./ResultFetchApi"
import { OptionsFetchApi } from "./OptionsFetchApi"
import { User } from "../models/User"
import { History } from "history"
import { AuthBody } from "../models/AuthBody"

export type AppContextProps = {
    fetchApi: (O : OptionsFetchApi) => Promise<ResultFetchApi | null>
    token: string | null;
    setToken: (value: string | null) => void;
    logout: (logOut: () => void) => Promise<void>;
    employee: User | null;
    history: History<unknown>;
    me: (token: string | null) => Promise<[User | null, ResultFetchApi | null]>;
    login:(_ : AuthBody & { 
        logIn?: () => void;
    }) => Promise<[string | null, ResultFetchApi | null]>;
}