import { ButtonProps } from "./ButtonProps";
import React, { ComponentProps } from "react";
import { IonHeader } from "@ionic/react"
import { FabButtonProps } from "./FabButtonProps";

export type HeaderProps = ComponentProps<typeof IonHeader> & {
    endButton?: ButtonProps;
    fabButton?: FabButtonProps;
}