import { ComponentType } from "react";
import { AppContextProps } from "./AppContextProps";
import { RouteComponentProps } from "./RouteComponentProps";
import {
    RouteComponentProps as RP
  } from "react-router";
import { IonRouteProps } from "@ionic/react";

export type AppRouteProps<T extends RouteComponentProps = RouteComponentProps> = {
    Component: ComponentType<T & RP<any>>;
    contextProps: AppContextProps
    auth?: boolean; 
    componentProps: T; 
} & Pick<IonRouteProps, 'path' | 'exact'>