import { IonInput } from "@ionic/react";
import { ComponentProps, ComponentType, MutableRefObject } from "react";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";

export type CommonInputProps<T extends Model = {}, T1 extends Model = T> = {
    OptionsDialog?: ComponentType<Omit<PopoverProps, 'children'> & {
        close: (newValue?: T | T1) => void
    }>;
    label:string;
    required?:boolean;
    xModel?: MutableRefObject<T>;
}

export type InputProps<T extends Model = {}, T1 extends Model = T> = (CommonInputProps<T, T1> & {
    inputProps: React.ComponentProps<typeof IonInput> & ({
        name?: keyof T1 | keyof T;
        updateModel?: (position: number, value?: string | null, xModel?: T, model?: MutableRefObject<T1>) => void;
    });
    Field?: undefined;
    xfield?: undefined;
}) | (CommonInputProps<T, T1> & {
    inputProps?: undefined;
    Field: React.ComponentType<{value?: object}>;
    xfield: keyof T | null;
});