import { ListProps } from "./ListProps";
import { Model } from "../models/Model";
import { PopoverProps } from "./PopoverProps";
import { SearchType } from "../models/Search";

export type OptionsDialogProps<T extends Model, SearchT extends SearchType, T1 extends Model = T> = {
    listProps?: Omit<ListProps<T, SearchT, T1>, 'buttonsProps' | 'footerProps'>;
    popoverProps: Omit<PopoverProps, 'children'>;
}