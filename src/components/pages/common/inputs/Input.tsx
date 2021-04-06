import React, { useState } from "react";
import { add } from 'ionicons/icons';

import { IonInput, IonIcon} from "@ionic/react";
import { Model } from "../../../models/Model";
import { InputProps } from "../../../types/InputProps";
import { FormState } from "../../../types/FormProps";
import { FileInput } from "./FileInput";
import { value } from "../../../../helpers/Helper";

export const Input = <T extends Model> ({
        OptionsDialog, 
        inputProps, 
        Field, 
        label, 
        model, 
        xfield,
}: InputProps<T> & FormState<T>) => {
    const valueOfModel = value<T>(inputProps?.name ?? xfield as keyof T, model);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const props: React.ComponentProps<typeof IonInput> = inputProps ? {
        ...inputProps, 
        ...!inputProps?.value && {value: !!valueOfModel ? inputProps.type === "date" ? String(valueOfModel).slice(0, 10) : String(valueOfModel) : ""},
        placeholder: inputProps?.placeholder ?? label,
        clearOnEdit: false,
        onIonChange: event => model = inputProps.name 
            ? {...model, [inputProps.name as keyof T]: event.detail.value} 
            : inputProps.getModel 
                ? inputProps.getModel(model, event.detail.value) as T
                : model
    } : {};
    return (
        <>
            {!!inputProps && !!inputProps.accept 
                ? <FileInput<T> {...props} model={model} />
                : !!inputProps 
                    ? <IonInput {...props} />
                    : Field && <Field {...xfield && {value: value<T>(xfield, model)}} />
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