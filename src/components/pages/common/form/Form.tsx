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
import { FormContextProps } from '../../../types/FormContextProps';
import { ComponentProps, useEffect, useState } from 'react';
import "./Form.scss";
import { FormPageContentProps } from '../../../types/FormPageContentProps';
import { InputProps } from '../../../types/InputProps';

export const Form = <T extends Model = {}, D extends Model = {}, T1 extends Model = T> ({FormConsumer, formProps}: FormContentProps<T, D, T1>) => (
    !!FormConsumer 
        ? <FormConsumer>
            {formContext => <FormPage<T, D, T1> pageProps={formContext} contentProps={{FormConsumer, formProps} as FormContentProps<T, D, T1>} /> }
        </FormConsumer>
        : <FormPage<T, D, T1> pageProps={formProps as FormContextProps<T, D, T1>} contentProps={{FormConsumer, formProps} as FormContentProps<T, D, T1>} />
);
const FormPage = <T extends Model = {}, D extends Model = {}, T1 extends Model = T> ({pageProps, contentProps}: {contentProps: FormContentProps<T, D, T1>, pageProps: ComponentProps<typeof Page>}) => (
    <Page {...pageProps} 
        key={pageProps.keyId}
        Content={() => <FormContent<T, D, T1> key={pageProps.keyId} {...contentProps} /> }
    />
);
export const FormContent = <T extends Model = {}, D extends Model = {}, T1 extends Model = T> ({FormConsumer, formProps} : FormContentProps<T, D, T1>) => (
    !!FormConsumer 
        ? <FormConsumer>
            {contextProps => <FormPageContent<T, D, T1> {...contextProps} />}
        </FormConsumer>
        : <FormPageContent<T, D, T1> {...formProps as FormContextProps<T, D, T1>} />
);
const FormPageContent = <T extends Model = {}, D extends Model = {}, T1 extends Model = T> ({formGroups, xModel, model, keyId}: FormPageContentProps<T, D, T1>) => {
    const [initialize, refresh] = useState(true);
    useEffect(() => console.log(model, xModel), [model, xModel, initialize]);
    return (
        <>
            {!!formGroups && formGroups.current.map(({Button, fieldGroups, fields, listProps, title}, index) => (
                <div key={`${keyId}-${index}`}>
                    <IonItemGroup className="ion-item-group" >
                        {title && 
                            <IonItemDivider>
                                <IonLabel className="ion-text-uppercase">
                                    {title}
                                </IonLabel>
                                <IonIcon size="small" color="success" slot="end" className="ion-icon" icon={checkmark} />
                            </IonItemDivider> 
                        }
                        {fieldGroups?.map((inputProps, position) => (
                            <IonItem key={`group-${position}`}>
                                <div className="ion-item-items">
                                    {inputProps?.map((i, index2) => (
                                        <div key={index2} className="field">
                                            <IonLabel className="ion-label ion-text-wrap">
                                                <small>{`${i.label}${!i.required ? "" : "*"}`}</small>
                                            </IonLabel>
                                            <div className="input">
                                                <Input<T, T1> 
                                                    {...{ ...i, position, xModel } as InputProps<T, T1>} 
                                                    model={model}
                                                    key={`${i.label} input-form`} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </IonItem>
                        ))}
                        {fields?.map((i, position) => (
                            <IonItem key={`field-${position}`}>
                                <IonLabel className="ion-label ion-text-wrap">
                                    <small>{`${i.label}${!i.required ? "" : "*"}`}</small>
                                </IonLabel>
                                <Input<T, T1> 
                                    {...{ ...i, position, xModel, model } as InputProps<T, T1>} 
                                    model={model}
                                    key={`${i.label} input-form`}   
                                />
                            </IonItem>
                        ))}
                    </IonItemGroup>
                    {!!listProps && <ListContent<D, {}, {}, {}, T1> key={`detail-list-${keyId}`} {...{...listProps, model } as ListContentProps<D, {}, {}, {}, T1>} />}
                    {Button && <Button refresh={() => refresh(!initialize)} />}
                </div>
            ))} 
        </>
    );
}