import { ResultFetchApi } from "./ResultFetchApi"
import { OptionsFetchApi } from "./OptionsFetchApi"
import { User } from "../models/User"
import { BrowserHistory } from "history"

export type AppContextProps = {
    fetchApi: (O : OptionsFetchApi) => Promise<ResultFetchApi>
    token: string | null;
    logout: (logOut: () => void) => void;
    employee: User | null;
    history: BrowserHistory;
}