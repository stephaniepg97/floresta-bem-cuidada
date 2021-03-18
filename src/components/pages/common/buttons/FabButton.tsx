import React, {ComponentType} from 'react';
import {
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import {FabButtonProps} from '../../../types/FabButtonProps'

export const FabButton: ComponentType<FabButtonProps> = ({fab, button, icon, visible}) => (
    <>
        {visible && 
            <IonFab 
                {...fab}
                slot="fixed">
                <IonFabButton {...button}>
                    <IonIcon {...icon} />
                </IonFabButton>
            </IonFab>
        }
    </>
);