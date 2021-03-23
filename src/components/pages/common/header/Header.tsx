import React, { ComponentType } from 'react';
import "./Header.scss";
import {
    IonToolbar,
    IonHeader
} from '@ionic/react';
import { Button } from "../buttons/Button"
import { HeaderProps } from "../../../types/HeaderProps"
import { FabButton } from '../buttons/FabButton';

export const Header: ComponentType<HeaderProps> = ({title, endButton, fabButton}) => (
    <IonHeader>
        <IonToolbar color="light">
            <div className="toolbar">
                <h6 className="ion-text-center page-title">
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
                {fabButton && 
                    <FabButton 
                        {...fabButton}
                        button={{
                            ...fabButton.button,
                            className: "ion-align-self-end",
                        }}
                    />
                }
            </div>
        </IonToolbar>
    </IonHeader>
);