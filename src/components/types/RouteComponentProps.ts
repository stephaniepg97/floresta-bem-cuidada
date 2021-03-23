import { HeaderProps } from "./HeaderProps"
import { OptionsFetchApi } from "./OptionsFetchApi";

export type RouteComponentProps = {
    headerProps?: HeaderProps;
    fetchApiOptions?: OptionsFetchApi;
    str_key: string;
}