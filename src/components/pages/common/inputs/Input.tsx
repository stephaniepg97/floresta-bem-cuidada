import React, { useState } from "react";
import { add } from 'ionicons/icons';

import { IonInput, IonIcon} from "@ionic/react";
import { Model } from "../../../models/Model";
import { InputProps } from "../../../types/InputProps";
import { FormState } from "../../../types/FormProps";
import { FileInput } from "./FileInput";

export const Input = <T extends Model> ({
        OptionsDialog, 
        inputProps, 
        Field, 
        label, 
        model, 
        xfield
}: InputProps<T> & FormState<T>) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const props: React.ComponentProps<typeof IonInput> = {
        ...inputProps, 
        placeholder: inputProps?.placeholder ?? label,
        clearOnEdit: false,
        value: !!inputProps?.name || !!xfield ? String(value<T>(inputProps?.name ?? xfield as keyof T, model)) : "",
        onIonChange: event => model = {...model, [inputProps?.name ?? xfield as keyof T]: event.detail.value}
    }
    return (
        <>
            {!!inputProps && !!inputProps.accept 
                ? <FileInput {...props} />
                : !!inputProps 
                    ? <IonInput {...props} />
                    : (xfield !== undefined) && Field && <Field {...xfield && {value: value<T>(xfield, model)}} />
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
export const value: (<C, >(_: keyof C, __: C) => object) = (key, object) => !!object && Object.entries(object).find(([k, _]) => key === k)?.[1];