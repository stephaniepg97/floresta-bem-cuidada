import { ButtonProps } from "./ButtonProps";
import React, { ComponentProps } from "react";
import { IonHeader } from "@ionic/react"
import { RouteComponentProps } from "react-router";

export type HeaderProps = ComponentProps<typeof IonHeader> & {
    endButton?: ButtonProps;
}