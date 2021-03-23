import { IonInput } from "@ionic/react";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";

type CommonInputProps<T extends Model> = {
    OptionsDialog?: React.ComponentType<PopoverProps>;
    label:string;
    required?:boolean;
}

export type InputProps<T extends Model> = (CommonInputProps<T> & {
    inputProps: React.ComponentProps<typeof IonInput> & {name: keyof T};
    Field?: undefined;
    xfield?: undefined;
}) | (CommonInputProps<T> & {
    inputProps?: undefined;
    Field: React.ComponentType<{value?: object}>;
    <T1>(xfield: T1 | undefined): keyof T | keyof T1 | null;
});