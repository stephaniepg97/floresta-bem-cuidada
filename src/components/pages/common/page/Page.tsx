import { useReducer, Reducer, FunctionComponent } from 'react';
import {
    IonContent,
    IonFooter,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/react';

import { chevronDownCircleOutline } from 'ionicons/icons';

import { PageProps } from '../../../types/PageProps';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ButtonProps } from '../../../types/ButtonProps';

import { Header } from "../header/Header";
import { Buttons } from '../buttons/Buttons'; 

export const Page: FunctionComponent<Pick<RouteComponentProps, 'headerProps' | 'keyId'> & PageProps> = ({
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
        </IonContent>
    );
}

/*
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
/>
*/