import React, {useState} from 'react';
import { search, add, removeOutline, trashBinOutline } from 'ionicons/icons';
import { FormContent } from "../form/Form"
import { Model } from "../../../models/Model"
import { IonItemDivider, IonLabel } from '@ionic/react';
import { Button } from '../buttons/Button';
import { Buttons } from '../buttons/Buttons';
import { FormContentProps } from '../../../types/FormContentProps';

export const Search = <T extends Model> ({model, ...props} : FormContentProps<T>) => {
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
                    visible
                />
            </IonItemDivider>
            {show &&
                <>
                    <FormContent<T, any> 
                        {...props}
                        key={`${props.keyId}-search-form`}
                        model={model}
                        
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
                        visible: true
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
                        visible: true
                    }]}/>
                </>
            }
        </>
    );
};