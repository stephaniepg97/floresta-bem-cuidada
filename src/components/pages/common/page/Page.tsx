import React, { ComponentType, useReducer, Reducer } from 'react';
import {
    IonContent,
    IonFooter,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/react';

import { chevronDownCircleOutline } from 'ionicons/icons';

import { CommonPageProps } from '../../../types/CommonPageProps';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ButtonProps } from '../../../types/ButtonProps';

import { Header } from "../header/Header";
import { Buttons } from '../buttons/Buttons';


/*TODO: const useBottomButtons = (props: {titles: Array<string>, visible: boolean, bottomButtons: Array<ButtonProps>, setButtons?: (value: Array<ButtonProps> | undefined) => void}) => {
    console.log(props.bottomButtons)
    return props.setButtons && props.bottomButtons && props.setButtons(props.bottomButtons.map<ButtonProps>(buttonProps => buttonProps?.button?.title && props.titles.includes(buttonProps.button.title) ? {...buttonProps, visible: props.visible} : buttonProps))
};*/

export const Page: ComponentType<RouteComponentProps & Pick<CommonPageProps, "Content" | "contentProps" | "footerProps" | "bottomButtonsProps"> & {
    bottomButtons: React.MutableRefObject<Array<ButtonProps> | undefined>;
}> = ({bottomButtons, Content, bottomButtonsProps, ...props}) => {
    const [buttons, setButtons] = useReducer<Reducer<Array<ButtonProps> | undefined, Array<ButtonProps> | undefined>>((oldValue, newValue) => {
        bottomButtons.current = newValue;
        return newValue;
    }, bottomButtons.current ? [...bottomButtons.current] : undefined);
    //console.log(buttons)
    return (    
        <IonContent {...props.contentProps}>
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
                    <Buttons buttons={buttons} {...bottomButtonsProps}/>
                </IonFooter>
            }
        </IonContent>
    );
}