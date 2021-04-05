import { ComponentType as CT } from "react";
import { RouteComponentProps } from "react-router";
import { IonRouteProps } from "@ionic/react";

export type AppRouteProps<T extends RouteComponentProps = RouteComponentProps> = {
    ComponentType: CT<T & { keyId: string; }>;
    auth?: boolean; 
    componentProps: Omit<T, keyof RouteComponentProps> | {}; 
    keyId: string;
} & Pick<IonRouteProps, 'path' | 'exact'>