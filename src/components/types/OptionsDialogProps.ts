import { ListProps } from "./ListProps";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";

export type OptionsDialogProps<T extends Model> = {
    listProps?: Omit<ListProps<T>, 'buttonsProps' | 'footerProps'>;
    popoverProps: Omit<PopoverProps, 'children'>;
}