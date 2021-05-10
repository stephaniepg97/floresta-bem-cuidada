import { IonInput } from "@ionic/react";
import { ComponentType, MutableRefObject } from "react";
import { Model } from "../models/Model";
import { DialogProps } from "./DialogProps";
import { FormState } from "./FormProps"; 

export type CommonInputProps<T extends Model = {}, T1 extends Model = T> = {
    OptionsDialog?: ComponentType<DialogProps<T, T1> & FormState<T1>>;
    label:string; 
    required?:boolean;
    xModel?: MutableRefObject<T>;
    position?: number;
}

export type InputProps<T extends Model = {}, T1 extends Model = T> = (CommonInputProps<T, T1> & {
    inputProps: React.ComponentProps<typeof IonInput> & ({
        name?: keyof T1 | keyof T;
        updateModel?: (position?: number, value?: string | null, xModel?: MutableRefObject<T>, model?: MutableRefObject<T1>) => void;
    });
    Field?: undefined;
    xfield?: undefined;
}) | (CommonInputProps<T, T1> & {
    inputProps?: undefined;
    Field: React.ComponentType<{value?: object}>;
    xfield: keyof T | null;
});