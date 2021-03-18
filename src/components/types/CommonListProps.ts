import { ColumnProps } from "./ColumnProps";
import { Model } from "../models/Model";
import { CommonPageProps } from "./CommonPageProps";

export type CommonListProps<T extends Model> = CommonPageProps & {
    fields: Array<ColumnProps<T>>;
}