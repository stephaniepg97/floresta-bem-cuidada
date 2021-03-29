import { IonToolbar } from "@ionic/react";
import { ComponentProps } from "react";
import { ButtonProps } from "./ButtonProps";

export type ButtonsProps = {
    toolbarProps?: ComponentProps<typeof IonToolbar>; 
    fixed?:boolean; 
    buttons?: Array<ButtonProps>;
}