import { IonInput } from "@ionic/react";
import { ComponentType, MutableRefObject } from "react";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";

export type CommonInputProps<T extends Model = {}> = {
    OptionsDialog?: ComponentType<Omit<PopoverProps, 'children'> & {setInputValue?: (value: string | null | number) => void; close: () => void}>;
    label:string;
    required?:boolean;
    xModel?: MutableRefObject<T>;
    inputRef?: React.RefObject<HTMLIonInputElement>;
}

export type InputProps<T extends Model = {}, T1 extends Model = T> = (CommonInputProps<T> & {
    inputProps: React.ComponentProps<typeof IonInput> & ({
        name: keyof T;
        getModel?: undefined;
    } | {
        name?: undefined;
        getModel: (model: T1, index: number, value?: string | null) => T1;
    });
    Field?: undefined;
    xfield?: undefined;
}) | (CommonInputProps<T> & {
    inputProps?: undefined;
    Field: React.ComponentType<{value?: object}>;
    xfield: keyof T | null;
});