import { ColumnProps } from "./ColumnProps";
import { Model } from "../models/Model";
import { PageProps } from "./PageProps";
import { FormContentProps } from "./FormProps";
import { ItemListChildProps } from "./ItemListProps";

export type ListProps<T extends Model = {}, T1 extends Model = T> = PageProps & Pick<ItemListChildProps<T>, 'onClick'> & {
    fields: Array<ColumnProps<T, T1>>;
    searchForm: FormContentProps<T>;
};