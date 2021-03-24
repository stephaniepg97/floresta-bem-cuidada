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

import { CommonFormProps, FormProps, FormState } from "../../../types/FormProps"
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { Input } from '../input/Input';
import { Page } from '../page/Page';
import { Model } from '../../../models/Model';
import { ListContent } from '../list/List';
import { ListContentProps } from '../../../types/ListContentProps';

import "./Form.scss";

export const Form = <T extends Model, D extends Model> (props: FormProps<T, D> & RouteComponentProps) => (
    <Page {...props} 
        key={props.keyId}
        Content={() => <FormContent<T, D> key={props.keyId} {...props} /> }
    />
);

export const FormContent = <T extends Model, D extends Model> ({form, model, listProps, ...props} : CommonFormProps<T, D> & FormState<T, D> & Pick<RouteComponentProps, 'keyId'>) => (
    <div key={props.keyId}>
        {form.map((group, index0) => (
            <div key={index0}>
                <IonItemGroup className="ion-item-group" >
                    {group.title && 
                        <IonItemDivider>
                            <IonLabel className="ion-text-uppercase">
                                {group.title}
                            </IonLabel>
                            <IonIcon size="small" color="success" slot="end" className="ion-icon" icon={checkmark} />
                        </IonItemDivider> 
                    }
                    {group.fields?.map((inputProps, index1) => (
                        <IonItem key={index1}>
                            <div className="ion-item-items">
                                {inputProps?.map((i, index2) => (
                                    <div key={index2} className="field">
                                        <IonLabel className="ion-label ion-text-wrap">
                                            <small>{`${i.label}${!i.required ? "" : "*"}`}</small>
                                        </IonLabel>
                                        <div className="input">
                                            <Input<T> {...i} model={model}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </IonItem>
                    ))}
                </IonItemGroup>
                {(!!listProps || !!group.listProps) && <ListContent key={`list-${index0}`} {...(listProps ?? group.listProps) as ListContentProps<T, any, any>} {...props} />}
            </div>
        ))}
    </div>
);