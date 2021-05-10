import { ComponentProps, useCallback, useState } from "react";
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
}: InputProps<T, T1> & FormState<T1>) => {
    const modelValue = useCallback(() => value<T|T1>(inputProps?.name as keyof T & keyof T1 ?? xfield as keyof T, !!xModel?.current ? xModel.current : model.current), [inputProps?.name, model, xModel, xfield]);
    const getValue = useCallback(() => {
        return !inputProps ? {} : {
            value: !!modelValue() ? inputProps.type === "date" ? String(modelValue()).slice(0, 10) : inputProps.type === "number" ? Number(modelValue()) :  String(modelValue()).replaceAll("%", "").replace("NULL", "") : ""
        };
    }, [inputProps, modelValue]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [fieldProps, setFieldProps] = useState<ComponentProps<typeof IonInput>>(inputProps ? {
        ...inputProps, 
        ...!inputProps?.value && getValue(),
        placeholder: inputProps?.placeholder ?? label,
        clearOnEdit: false,
        onIonChange: event => {
            let value = event.detail.value?.replaceAll("%", ""), splited = value?.split(",");
            if (!!inputProps.name) {
                if (!!xModel) xModel.current = {...xModel.current, [inputProps.name as keyof T]: inputProps.type === "date" ? value + "T00:00:00Z" : !splited ? "" : splited[0]};
                else model.current = {...model.current, [inputProps.name as keyof T1]: inputProps.type === "date" ? value + "T00:00:00Z" : !splited ? "" : splited[0]};
            }
            if (!!inputProps.updateModel) inputProps.updateModel(position, value, xModel, model)
            inputProps.onIonChange && inputProps.onIonChange(event);
            setFieldProps({...fieldProps, ...!!inputProps.name ? getValue() : { value: !splited ? "" : splited[0] } });
        }
    } : {});
    const close = useCallback<(newValue?: T|T1) => void>(newValue => {
        console.log(xModel, model)
        if(!!xModel) xModel.current = newValue as T ?? xModel.current;
        else model.current = newValue as T1 ?? model.current;
        const value = modelValue();
        if (!!inputProps?.updateModel) inputProps.updateModel(position, !!value ? String(value) : null, xModel, model)
        setFieldProps({...fieldProps, ...getValue()})
        setShowDialog(false)
    }, [setShowDialog, fieldProps, getValue, xModel, model, inputProps, modelValue, position]);
    return (
        <>
            {!!inputProps && !!inputProps.accept 
                ? <FileInput<T1> {...fieldProps} model={model} />
                : !!inputProps 
                    ? <IonInput {...fieldProps} clearOnEdit={false} />
                    : Field && <Field {...xfield && {value: modelValue()}} />
            }
            {OptionsDialog && (
                <>
                    <IonIcon size="small" color="medium" slot="end" className="ion-icon" icon={add} onClick={() => setShowDialog(true)}/> 
                    <OptionsDialog {...{close, model, popoverProps: { isOpen: showDialog, onDidDismiss: () => setShowDialog(false) }}} />
                </>
            )}
        </>
    );
} 