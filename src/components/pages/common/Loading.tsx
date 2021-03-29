import React, { ComponentProps, ComponentType } from 'react';
import {
    IonLoading
} from '@ionic/react';

type LoadingProps = ComponentProps<typeof IonLoading>

export const Loading: ComponentType<LoadingProps> = ({ message = 'A carregar...', ...props}) => {
    return (
        <IonLoading
            message={message}
            {...props}
        />
    );
}