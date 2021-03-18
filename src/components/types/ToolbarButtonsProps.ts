import { IonToolbar } from "@ionic/react";
import { ComponentProps } from "react";

export type ToolbarButtonsProps = {
    toolbarProps?: ComponentProps<typeof IonToolbar>; 
    fixed?:boolean; 
    centered?:boolean
}