import { ResultFetchApi } from "./ResultFetchApi"
import { OptionsFetchApi } from "./OptionsFetchApi"
import { User } from "../models/User"
import { BrowserHistory } from "history"
import { AuthBody } from "../models/AuthBody"

export type AppContextProps = {
    fetchApi: (O : OptionsFetchApi) => Promise<ResultFetchApi>
    token: string | null;
    logout: (logOut: () => void) => void;
    employee: User | null;
    history: BrowserHistory;
    me: (token: string | null) => Promise<[User | null, ResultFetchApi]>;
    login:(_ : AuthBody & { 
        logIn?: () => void;
    }) => Promise<ResultFetchApi>
}