import { IonButtons, IonToolbar } from '@ionic/react';
import React, { ComponentType } from 'react';

import { ButtonProps } from '../../../types/ButtonProps';
import { ToolbarButtonsProps } from '../../../types/ToolbarButtonsProps';
import { Button } from './Button';

import "./Buttons.scss"

export const Buttons: ComponentType<{buttons: Array<ButtonProps>} & ToolbarButtonsProps> = ({buttons, toolbarProps, fixed, centered}) => (
    <IonToolbar {...toolbarProps} className={`buttons-toolbar ${fixed ? "fixed-buttons-toolbar" : ""} ${centered ? "centered-buttons-toolbar" : ""} ${toolbarProps?.className}}`} color="transparent">
        <IonButtons>
            {buttons.map((buttonProps, index) => (
                <Button
                    key={index}
                    {...{...buttonProps, button: {...buttonProps.button, className: "end-button"}}}
                />
            ))}
        </IonButtons>   
    </IonToolbar>
);