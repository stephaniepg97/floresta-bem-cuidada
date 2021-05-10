import { Model } from "../models/Model";
import { ButtonProps } from "./ButtonProps";
import { PopoverProps } from "./PopoverProps";

export type DialogProps<T extends Model = {}, T1 extends Model = T> = {
    popoverProps: Omit<PopoverProps, 'children'>;
    close: (newValue?: T | T1) => void
    buttons?: Array<ButtonProps>;
}