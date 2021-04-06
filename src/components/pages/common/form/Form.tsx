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
import { FormContextProps } from '../../../types/FormContextProps';

const FormPage = <T extends Model = {}, D extends Model = {}> ({pageProps, contentProps}: {contentProps: FormContentProps<T, D>, pageProps: FormContextProps<T, D>}) => (
    <Page {...pageProps} 
        key={pageProps.keyId}
        Content={() => <FormContent<T, D> key={pageProps.keyId} {...contentProps} /> }
    />
);
const FormPageContent = <T extends Model = {}, D extends Model = {}> ({model, keyId, formGroups, ...props}: FormContextProps<T, D>) => (
    <div key={keyId}>
        {formGroups.map(({Button, fieldGroups, fields, listProps, title}, index0) => (
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
                    {fieldGroups?.map((inputProps, index1) => (
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
                {Button && <Button />}
            </div>
        ))}
    </div>
);
export const Form = <T extends Model = {}, D extends Model = {}> ({FormConsumer, formProps}: FormContentProps<T, D>) => (
    <>
        {
            !!FormConsumer 
                ? <FormConsumer>
                    {formContext => <FormPage<T, D> pageProps={formContext} contentProps={{FormConsumer, formProps} as FormContentProps<T, D>} /> }
                </FormConsumer>
                : <FormPage<T, D> pageProps={formProps as FormContextProps<T, D>} contentProps={{FormConsumer, formProps} as FormContentProps<T, D>} />
        }
    </>
);
export const FormContent = <T extends Model = {}, D extends Model = {}> ({FormConsumer, formProps} : FormContentProps<T, D>) => (
    <>
        {
            !!FormConsumer 
                ? <FormConsumer>
                    {contextProps => <FormPageContent<T, D> {...contextProps} />}
                </FormConsumer>
                : <FormPageContent<T, D> {...formProps as FormContextProps<T, D>} />
        }
    </>
);