import { HeaderProps } from "./HeaderProps"
import { ResultFetchApi } from "./ResultFetchApi"
import { OptionsFetchApi } from "./OptionsFetchApi"

export type RouteComponentProps = {
    fetchApi: (O : OptionsFetchApi) => Promise<ResultFetchApi>
    token: string | null;
    headerProps?: HeaderProps;
    fetchApiOptions?: OptionsFetchApi
}