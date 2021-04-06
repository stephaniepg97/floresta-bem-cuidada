import React, {useState} from 'react';
import { search, add, removeOutline, trashBinOutline } from 'ionicons/icons';
import { FormContent } from "../form/Form"
import { Model } from "../../../models/Model"
import { IonItemDivider, IonLabel } from '@ionic/react';
import { Button } from '../buttons/Button';
import { Buttons } from '../buttons/Buttons';
import { FormContentProps } from '../../../types/FormProps';
import { FormContextProps } from '../../../types/FormContextProps';

export const Search = <T extends Model = {}> ({FormConsumer, formProps} : FormContentProps<T>) => (
    <>
        {
            !!FormConsumer 
                ? <FormConsumer>
                    {contextProps => <SearchContent<T> {...contextProps} />}
                </FormConsumer>
                : <SearchContent<T> {...formProps as FormContextProps<T>} />
        }
    </>
);

const SearchContent = <T extends Model = {}> (formProps : FormContextProps<T>) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <IonItemDivider>
                <IonLabel className="ion-text-uppercase">
                    Pesquisa
                </IonLabel>
                <Button 
                    icon={{
                        icon: show ? removeOutline : add,
                        color: "dark"
                    }}
                    button={{
                        fill: "clear",
                        color:"light",
                        slot: "end",
                        className: "ion-align-self-end",
                        onClick: () => setShow(!show)
                    }}
                />
            </IonItemDivider>
            {show &&
                <>
                    <FormContent<T> 
                        {...{formProps}}
                        key={`${formProps.keyId}-search-form`}
                    />
                    <Buttons buttons={[{
                        text: "Pesquisar",
                        icon: {
                            icon: search,
                            color: "white"
                        },
                        label: {color: "white"},
                        button: {
                            onClick: () => {},
                            color: "medium",
                        },
                    }, {
                        text: "Limpar",
                        icon: {
                            icon: trashBinOutline,
                            color: "white"
                        },
                        label: {color: "white"},
                        button: {
                            onClick: () => {},
                            color: "danger",
                        },
                    }]}/>
                </>
            }
        </>
    )
}