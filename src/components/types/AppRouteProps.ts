import { ComponentType } from "react";
import { AppContextProps } from "./AppContextProps";
import { RouteComponentProps } from "./RouteComponentProps";
import {
    RouteProps,
    RouteComponentProps as RP
  } from "react-router";

export type AppRouteProps<T extends RouteComponentProps = RouteComponentProps> = {
    Component: ComponentType<T & AppContextProps & RP<any>>;
    contextProps: AppContextProps
    auth?: boolean; 
    componentProps: T; 
} & Pick<RouteProps, 'path' | 'exact'>