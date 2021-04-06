import { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { IonRouteProps } from "@ionic/react";

export type AppRouteProps = {
    auth?: boolean; 
} & Pick<IonRouteProps, 'path' | 'render'>