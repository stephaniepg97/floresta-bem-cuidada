import { HeaderProps } from "./HeaderProps"
import { OptionsFetchApi } from "./OptionsFetchApi";

export type RouteComponentProps = {
    fetchApiOptions?: OptionsFetchApi;
    headerProps?: HeaderProps;
    keyId: string;
}