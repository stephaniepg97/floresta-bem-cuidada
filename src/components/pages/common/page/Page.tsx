import React, { ComponentType, useReducer, Reducer } from 'react';
import {
    IonContent,
    IonFooter,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/react';

import { chevronDownCircleOutline, arrowUp } from 'ionicons/icons';

import { CommonPageProps } from '../../../types/CommonPageProps';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ButtonProps } from '../../../types/ButtonProps';

import { Header } from "../header/Header";
import { Buttons } from '../buttons/Buttons';
import { FabButton } from '../buttons/FabButton';

export const Page: ComponentType<RouteComponentProps & CommonPageProps> = ({
    buttonsProps, 
    Content,
    ...props
}) => {
    const [buttons, setButtons] = useReducer<Reducer<Array<ButtonProps> | undefined, Array<ButtonProps> | undefined>>((_, newValue) => {
        if (!!buttonsProps) { 
            buttonsProps = {...buttonsProps, buttons: newValue };
        }
        return newValue;
    }, buttonsProps?.buttons);
    return (    
        <IonContent onScroll={(event) => console.log(event)} key={props.keyId} {...props.contentProps}>
            <IonRefresher slot="fixed" onIonRefresh={() => { }}>
                <IonRefresherContent
                    pullingIcon={chevronDownCircleOutline}
                    refreshingSpinner="circles">
                </IonRefresherContent>
            </IonRefresher>
            {props.headerProps && <Header {...props.headerProps} />}
            {Content && <Content setButtons={(value) => setButtons(value)}/> }
            {buttons &&
                <IonFooter {...props.footerProps} className={`ion-no-border ${props.footerProps?.className}`}>
                    <Buttons {...buttonsProps}/>
                </IonFooter>
            }
            <FabButton
                fab={{
                    vertical: "bottom",
                    horizontal: "end"
                }}
                icon={{
                    icon: arrowUp
                }}
                button={{
                    color: "white",
                    onClick: () => {} //scrollTo({top: 0})
                }}
                visible={true}
            />
        </IonContent>
    );
}