
import { Model } from "../models/Model"
import { FormGroupProps } from "./FormProps";
import { InputProps } from "./InputProps"

export type ColumnProps<T extends Model> = InputProps<T> & {
    size?:string;
    checkbox?:boolean;
    searchForm?: Pick<FormGroupProps<T, {}>, 'fields' | 'fieldGroups'>;
};