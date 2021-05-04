import { MutableRefObject } from "react";
import { HeaderProps } from "./HeaderProps"
import { OptionsFetchApi } from "./OptionsFetchApi";

export type RouteComponentProps = {
    fetchApiOptions?: OptionsFetchApi | null;
    headerProps?: HeaderProps;
    keyId: string;
}