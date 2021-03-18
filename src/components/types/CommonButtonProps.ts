import { IonIcon } from "@ionic/react"
import { ComponentProps } from "react"

export type CommonButtonProps = {
    icon?: ComponentProps<typeof IonIcon>;
    visible:boolean;
}