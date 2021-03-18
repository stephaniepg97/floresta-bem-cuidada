import React, { ComponentType } from 'react';
import {
    IonButton,
    IonIcon,
    IonLabel,
} from '@ionic/react';


import { ButtonProps } from '../../../types/ButtonProps';

export const Button: ComponentType<ButtonProps> = ({icon, text, label, button, visible}) => (
    <>
        {visible && 
            <IonButton 
                fill="solid"
                {...button}>
                { text && <IonLabel {...label}>{text}</IonLabel> }
                { icon && <IonIcon slot={text ? "end" : "icon-only"} {...icon} /> }
            </IonButton>
        }
    </>
);