import React, { ComponentProps } from 'react';
import { CommonButtonProps } from "./CommonButtonProps"
import { IonLabel, IonButton } from "@ionic/react"

export type ButtonProps = CommonButtonProps & {
    button?: ComponentProps<typeof IonButton>;
    text?: string;
    label?: ComponentProps<typeof IonLabel>
}