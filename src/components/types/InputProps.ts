import { IonInput } from "@ionic/react";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";

type CommonInputProps = {
    OptionsDialog?: React.ComponentType<PopoverProps>;
    label:string;
    required?:boolean;
}

export type InputProps<T extends Model> = (CommonInputProps & {
    inputProps: React.ComponentProps<typeof IonInput> & {
        name: keyof T;
    };
    Field?: undefined;
    xfield?: undefined;
}) | (CommonInputProps & {
    inputProps?: undefined;
    Field: React.ComponentType<{value?: object}>;
    xfield: keyof T | null;
});