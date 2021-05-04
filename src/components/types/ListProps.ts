import { ColumnProps } from "./ColumnProps";
import { Model } from "../models/Model";
import { PageProps } from "./PageProps";
import { FormContentProps } from "./FormProps";
import { ItemListChildProps } from "./ItemListProps";
import { SearchProps } from "./SearchProps";
import { SearchType } from "../models/Search";

export type ListProps<T extends Model, SearchT extends SearchType = {}, T1 extends Model = T> = PageProps & Pick<ItemListChildProps<T, T1>, 'onClick' | 'model'> & {
    fields: Array<ColumnProps<T, T1>>;
    searchForm: FormContentProps<SearchT> & Pick<SearchProps, 'clean' | 'search'>;
};