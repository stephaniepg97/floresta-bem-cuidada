import { ListProps } from "./ListProps";
import { Model } from "../models/Model";
import { SearchType } from "../models/Search";
import { DialogProps } from "./DialogProps";

export type OptionsDialogProps<T extends Model, SearchT extends SearchType, T1 extends Model = T> = Omit<DialogProps<T, T1>, 'close' | 'buttons'> & {
    listProps?: Omit<ListProps<T, SearchT, T1>, 'buttonsProps' | 'footerProps'>;
}