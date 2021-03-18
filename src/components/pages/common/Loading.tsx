import React, { FC } from 'react';
import {
    IonLoading
} from '@ionic/react';

type LoadingProps = {
    isOpen: boolean;
}

export const Loading: FC<LoadingProps> = ({ isOpen }) => {
    return (
        <IonLoading
            isOpen={isOpen}
            message={'A carregar...'}
        />
    );
}