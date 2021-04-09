import { ColumnProps } from "./ColumnProps";
import { Model } from "../models/Model";
import { PageProps } from "./PageProps";
import { FormContentProps } from "./FormProps";

export type ListProps<T extends Model = {}> = PageProps & {
    fields: Array<ColumnProps<T>>;
    searchForm: FormContentProps<T>;
};