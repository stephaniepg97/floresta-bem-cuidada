import { ColumnProps } from "./ColumnProps";
import { Model } from "../models/Model";
import { PageProps } from "./PageProps";
import { DocumentFormProps } from "./DocumentFormProps";

export type ListProps<T extends Model = {}> = PageProps & {
    fields: Array<ColumnProps<T>>;
    searchForm: DocumentFormProps<T>;
};