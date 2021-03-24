import { IonIcon, IonItem, IonRouterLink } from "@ionic/react";
import { ComponentProps } from "react";

export type MenuItemProps = ComponentProps<typeof IonItem> & {
    icon?: ComponentProps<typeof IonIcon>;
    subItems?:Array<MenuItemProps>;
}