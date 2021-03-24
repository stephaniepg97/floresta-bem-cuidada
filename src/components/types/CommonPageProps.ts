import { ComponentProps, ComponentType } from "react";
import { IonContent, IonFooter } from "@ionic/react";
import { ButtonProps } from "./ButtonProps";
import { ToolbarButtonsProps } from "./ToolbarButtonsProps";

export type CommonPageProps = {
    contentProps?:ComponentProps<typeof IonContent>;
    footerProps?: ComponentProps<typeof IonFooter>;
    bottomButtonsProps?: ToolbarButtonsProps
    Content?: ComponentType<{setButtons?: (value: Array<ButtonProps> | undefined) => void}>;
};