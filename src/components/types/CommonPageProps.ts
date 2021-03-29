import { ComponentProps, ComponentType, MutableRefObject } from "react";
import { IonContent, IonFooter } from "@ionic/react";
import { ButtonsProps } from "./ButtonsProps";
import { ListContentProps } from "./ListContentProps";

export type CommonPageProps = {
    contentProps?:ComponentProps<typeof IonContent>;
    footerProps?: ComponentProps<typeof IonFooter>;
    buttonsProps?: ButtonsProps;
    Content?: ComponentType<Pick<ListContentProps, 'setButtons'>> & Pick<ButtonsProps, 'buttons'>;
};