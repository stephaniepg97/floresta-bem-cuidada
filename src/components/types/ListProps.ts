import { ColumnProps } from "./ColumnProps";
import { Model } from "../models/Model";
import { PageProps } from "./PageProps";
import { FormContentProps } from "./FormProps";

export type ListProps<T extends Model = {}, T1 extends Model = T> = PageProps & {
    fields: Array<ColumnProps<T, T1>>;
    searchForm: FormContentProps<T>;
};