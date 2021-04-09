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
    const valueOfModel = value<T>(inputProps?.name ?? xfield as keyof T, model.current);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const props: React.ComponentProps<typeof IonInput> = inputProps ? {
        ...inputProps, 
        ...!inputProps?.value && {value: !!valueOfModel ? inputProps.type === "date" ? String(valueOfModel).slice(0, 10) : inputProps.type === "number" ? Number(valueOfModel) :  String(valueOfModel) : ""},
        placeholder: inputProps?.placeholder ?? label,
        clearOnEdit: false,
        onIonChange: event => {
            model.current = inputProps.name 
            ? {...model.current, [inputProps.name as keyof T]: inputProps.type === "date" ? event.detail.value + "T00:00:00Z" : event.detail.value} 
            : inputProps.getModel 
                ? inputProps.getModel(model.current, event.detail.value) as T
                : model.current
            console.log(model.current)
        }
    } : {};
    return (
        <>
            {!!inputProps && !!inputProps.accept 
                ? <FileInput<T> {...props} model={model} />
                : !!inputProps 
                    ? <IonInput {...props} />
                    : Field && <Field {...xfield && {value: valueOfModel}} />
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