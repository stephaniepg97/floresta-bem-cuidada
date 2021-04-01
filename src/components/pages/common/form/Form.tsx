import {
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonIcon,
    IonItem,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { FormContentProps } from "../../../types/FormProps"
import { Input } from '../inputs/Input';
import { Page } from '../page/Page';
import { Model } from '../../../models/Model';
import { ListContent } from '../list/List';
import { ListContentProps } from '../../../types/ListContentProps';

import "./Form.scss";

export const Form = <T extends Model, D extends Model> ({FormContext, formGroups}: FormContentProps<T, D>) => (
    <FormContext.Consumer>
        {formContext =>
            <Page {...formContext} 
                key={formContext.keyId}
                Content={() => <FormContent<T, D> key={formContext.keyId} {...{FormContext, formGroups}} /> }
            />
        }
    </FormContext.Consumer>
);

export const FormContent = <T extends Model, D extends Model = {}> ({FormContext, formGroups} : FormContentProps<T, D>) => (
    <FormContext.Consumer>
        {({model, keyId, ...props}) =>
            <div key={keyId}>
                {formGroups.map(({Button, fieldGroups: fieldGroup, fields, listProps, title}, index0) => (
                    <div key={`${keyId}-${index0}`}>
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
                                                    <Input<T> {...i} model={model}/>
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
                                    <Input<T> {...i} model={model}/>
                                </IonItem>
                            ))}
                        </IonItemGroup>
                        {!!listProps && <ListContent key={`list-${index0}`} {...listProps as ListContentProps<D>} {...props} />}
                        {Button && <Button {...{fieldGroups: fieldGroup, fields, listProps}} />}
                    </div>
                ))}
            </div>
        }
    </FormContext.Consumer>
);