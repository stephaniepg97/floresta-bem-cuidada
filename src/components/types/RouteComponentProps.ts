import { MutableRefObject } from "react";
import { ButtonProps } from "./ButtonProps";
import { HeaderProps } from "./HeaderProps"
import { OptionsFetchApi } from "./OptionsFetchApi";

export type RouteComponentProps = {
    fetchApiOptions?: OptionsFetchApi;
    headerProps?: HeaderProps;
    keyId: string;
    bottomButtons?: MutableRefObject<ButtonProps[] | undefined>;
}