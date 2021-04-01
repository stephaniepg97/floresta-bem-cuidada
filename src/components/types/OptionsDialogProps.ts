import { ListProps } from "./ListProps";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";

export type OptionsDialogProps<T extends Model> = {
    listProps?: ListProps<T>;
    popoverProps: PopoverProps
}