import React, {ComponentType} from 'react';
import {
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import {FabButtonProps} from '../../../types/FabButtonProps'

export const FabButton: ComponentType<FabButtonProps> = ({fab = {slot: "fixed"}, button, icon, visible = true}) => (
    <>
        {visible && 
            <IonFab {...fab}>
                <IonFabButton {...button}>
                    <IonIcon {...icon} />
                </IonFabButton>
            </IonFab>
        }
    </>
);