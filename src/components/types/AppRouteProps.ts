import { ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import { IonRouteProps } from "@ionic/react";

export type AppRouteProps<T extends RouteComponentProps = RouteComponentProps> = {
    Component: ComponentType<T & Pick<AppRouteProps, 'keyId'>>;
    auth?: boolean; 
    componentProps: Omit<T, keyof RouteComponentProps> | {}; 
    keyId: string;
} & Pick<IonRouteProps, 'path' | 'exact'>