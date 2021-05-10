import { IonPopover } from "@ionic/react";
import { Buttons } from '../buttons/Buttons';
import { FunctionComponent } from "react";
import { DialogProps } from "../../../types/DialogProps";
import "./Dialog.scss"

export const Dialog: FunctionComponent<Omit<DialogProps, 'close'>> = ({popoverProps, buttons, children}) => (
    <IonPopover {...popoverProps} cssClass={`dialog ${popoverProps.cssClass}`}>
        {children}
        {!!buttons && <Buttons {...{buttons}}/>}
    </IonPopover>
)