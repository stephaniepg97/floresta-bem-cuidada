import React, { useRef } from 'react';
//import { useForm } from "react-hook-form";
import {
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonIcon,
    IonItem,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';

import { CommonFormProps, FormProps, FormState } from "../../../types/FormProps"
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { Input } from '../input/Input';
import { Page } from '../page/Page';
import { Model } from '../../../models/Model';

import "./Form.scss";
import { ButtonProps } from '../../../types/ButtonProps';

export const Form = <T, D> (props: FormProps<T, D> & RouteComponentProps) => {
    const bottomButtonsRef = useRef<Array<ButtonProps> | undefined>(props.bottomButtons);
    return (
        <Page 
            {...props} 
            Content={() => <FormContent<T> model={props.model} form={props.form} /> }
            bottomButtons={bottomButtonsRef}
        />
    );
}

export const FormContent = <T extends Model> ({form, model} : CommonFormProps<T> & FormState<T, any>) => (
    <>
        {form.map((group, index) => (
            <IonItemGroup className="ion-item-group" key={index}>
                {group.title && 
                    <IonItemDivider>
                        <IonLabel className="ion-text-uppercase">
                            {group.title}
                        </IonLabel>
                        <IonIcon size="small" color="success" slot="end" className="ion-icon" icon={checkmark} />
                    </IonItemDivider> 
                }
                {group.fields.map((inputProps, index) => (
                    <IonItem className="ion-item" key={index}>
                        <IonLabel position="fixed">
                            <small>{`${inputProps.label}${!inputProps.required ? "" : "*"}`}</small>
                        </IonLabel>
                        <Input<T> {...inputProps} model={model}/>
                    </IonItem>
                ))}
            </IonItemGroup>
        ))}
    </>
);