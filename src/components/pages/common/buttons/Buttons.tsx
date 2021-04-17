import { IonButtons, IonToolbar } from '@ionic/react';
import React, { ComponentType } from 'react';

import { ButtonsProps } from '../../../types/ButtonsProps';
import { Button } from './Button';

import "./Buttons.scss"

export const Buttons: ComponentType<ButtonsProps> = ({buttons, toolbarProps, fixed}) => (
    <IonToolbar {...toolbarProps} className={`${fixed && "fixed-toolbar"} ${toolbarProps?.className}}`} color="transparent">
        {buttons && 
            <div className="flex-row-center-content">
                <IonButtons>
                    {buttons.map((buttonProps, index) => (
                        <div key={index} className="end-button-container">
                            <Button {...{...buttonProps, button: {...buttonProps.button, className: `${buttonProps.button?.className} end-button`}}} />
                        </div>
                    ))}
                </IonButtons> 
            </div> 
        }
    </IonToolbar>
);