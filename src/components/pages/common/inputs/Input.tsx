import { ComponentProps, useCallback, useRef, useState } from "react";
import { add } from 'ionicons/icons';
import { IonInput, IonIcon} from "@ionic/react";
import { Model } from "../../../models/Model";
import { InputProps } from "../../../types/InputProps";
import { FormState } from "../../../types/FormProps";
import { FileInput } from "./FileInput";
import { value } from "../../../../helpers/Helper";

export const Input = <T extends Model, T1 extends Model = T> ({
        OptionsDialog, 
        inputProps, 
        Field, 
        label, 
        model, 
        xfield,
        xModel,
        position,
}: InputProps<T, T1> & FormState<T1> & {
    position: number
}) => {
    const inputRef = useRef<HTMLIonInputElement>(null);
    const valueOfModel = value<T|T1>(inputProps?.name as keyof T & keyof T1 ?? xfield as keyof T, !!xModel ? xModel.current : model.current);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const close = useCallback(() => setShowDialog(false), [setShowDialog]);
    const props: ComponentProps<typeof IonInput> = inputProps ? {
        ...inputProps, 
        ...!inputProps?.value && {value: !!valueOfModel ? inputProps.type === "date" ? String(valueOfModel).slice(0, 10) : inputProps.type === "number" ? Number(valueOfModel) :  String(valueOfModel) : ""},
        placeholder: inputProps?.placeholder ?? label,
        clearOnEdit: false,
        onIonChange: event => {
            if(!!xModel) {
                xModel.current = inputProps.name 
                    ? {...xModel.current, [inputProps.name as keyof T]: inputProps.type === "date" ? event.detail.value + "T00:00:00Z" : event.detail.value} 
                    : xModel.current;
            }
            model.current = inputProps.getModel 
                ? inputProps.getModel(model.current, position, event.detail.value)
                : model.current;
            inputProps.onIonChange && inputProps.onIonChange(event)
        }
    } : {};
    return (
        <>
            {!!inputProps && !!inputProps.accept 
                ? <FileInput<T1> {...props} model={model} />
                : !!inputProps 
                    ? <IonInput ref={inputRef} {...props} />
                    : Field && <Field {...xfield && {value: valueOfModel}} />
            }
            {OptionsDialog && (
                <>
                    <IonIcon size="small" color="medium" slot="end" className="ion-icon" icon={add} onClick={() => setShowDialog(true)}/> 
                    <OptionsDialog close={close} isOpen={showDialog} onDidDismiss={close} setInputValue={value => {
                        if(!!inputRef.current) inputRef.current.value = value;
                    }} />
                </>
            )}
        </>
    );
}