import React, { useCallback, useState } from "react";
import { add } from 'ionicons/icons';

import { IonInput, IonIcon} from "@ionic/react";
import { Model } from "../../../models/Model";
import { InputProps } from "../../../types/InputProps";


export const Input = <T extends Model> ({
        OptionsDialog, 
        inputProps, 
        Field, 
        label, 
        model, 
        xfield
}: InputProps<T> & {model: T}) => {
    const value = useCallback<(<C, >(_: keyof C, __: C) => object)>((key, object) => !!object && Object.entries(object).find(([k, value]) => key === k)?.[1], []);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    return (
        <>
            {inputProps ?
                <IonInput
                    {...inputProps}
                    className="ion-input"
                    placeholder={label}
                    clearOnEdit={false} 
                    value={String(value<T>(inputProps.name, model) ?? "")}
                />
                : (xfield !== undefined) && Field && <Field {...xfield !== null && {value: value<T>(xfield, model)}} />
            }
            {OptionsDialog && (
                <>
                    <IonIcon size="small" color="medium" slot="end" className="ion-icon" icon={add} onClick={() => setShowDialog(true)}/> 
                    <OptionsDialog isOpen={showDialog} onDidDismiss={() => setShowDialog(false)} children />
                </>
            )}
        </>
    );
}