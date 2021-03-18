import React, { ComponentType } from 'react';
import "./Header.scss";
import {
    IonToolbar,
    IonHeader
} from '@ionic/react';
import { Button } from "../buttons/Button"
import { HeaderProps } from "../../../types/HeaderProps"

export const Header: ComponentType<HeaderProps> = ({title, endButton}) => (
    <IonHeader>
        <IonToolbar color="light">
            <h6 className="ion-text-center ion-text-uppercase page-title">
                {title}
            </h6>
            {endButton && 
                <Button 
                    {...endButton}
                    button={{
                        ...endButton.button,
                        slot: "end",
                        className: "ion-align-self-end",
                    }}
                />
            }
        </IonToolbar>
    </IonHeader>
);