import React from 'react';
//import { useForm } from "react-hook-form";
import {
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonIcon,
    IonItem,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { FormProps } from "../../../types/FormProps"
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { Input } from '../inputs/Input';
import { Page } from '../page/Page';
import { Model } from '../../../models/Model';
import { ListContent } from '../list/List';
import { ListContentProps } from '../../../types/ListContentProps';
import { FormContentProps } from '../../../types/FormContentProps';

import "./Form.scss";

export const Form = <T extends Model, D extends Model> (props: FormProps<T, D> & RouteComponentProps) => (
    <Page {...props} 
        key={props.keyId}
        Content={() => <FormContent<T, D> key={props.keyId} {...props} /> }
    />
);

export const FormContent = <T extends Model, D extends Model> (props : FormContentProps<T, D>) => (
    <div key={props.keyId}>
        {props.form.map(({Bottom, fieldGroup, fields, listProps, title}, index0) => (
            <div key={index0}>
                <IonItemGroup className="ion-item-group" >
                    {title && 
                        <IonItemDivider>
                            <IonLabel className="ion-text-uppercase">
                                {title}
                            </IonLabel>
                            <IonIcon size="small" color="success" slot="end" className="ion-icon" icon={checkmark} />
                        </IonItemDivider> 
                    }
                    {fieldGroup?.map((inputProps, index1) => (
                        <IonItem key={`group-${index1}`}>
                            <div className="ion-item-items">
                                {inputProps?.map((i, index2) => (
                                    <div key={index2} className="field">
                                        <IonLabel className="ion-label ion-text-wrap">
                                            <small>{`${i.label}${!i.required ? "" : "*"}`}</small>
                                        </IonLabel>
                                        <div className="input">
                                            <Input<T> {...i} model={props.model}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </IonItem>
                    ))}
                    {fields?.map((i, index2) => (
                        <IonItem key={`field-${index2}`}>
                            <IonLabel className="ion-label ion-text-wrap">
                                <small>{`${i.label}${!i.required ? "" : "*"}`}</small>
                            </IonLabel>
                            <Input<T> {...i} model={props.model}/>
                        </IonItem>
                    ))}
                </IonItemGroup>
                {!!listProps && <ListContent key={`list-${index0}`} {...listProps as ListContentProps<D>} {...props} />}
                {Bottom && <Bottom model={props.model} />}
            </div>
        ))}
    </div>
);