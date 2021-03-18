import { CommonListProps } from "./CommonListProps";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";

export type OptionsDialogProps<T extends Model> = {
    listProps?: CommonListProps<T>;
    popoverProps: PopoverProps
}