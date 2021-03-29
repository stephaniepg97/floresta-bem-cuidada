
import { Model } from "../models/Model"
import { CommonFormProps } from "./FormProps";
import { InputProps } from "./InputProps"

export type ColumnProps<T extends Model> = InputProps<T> & {
    size?:string;
    checkbox?:boolean;
    searchForm?: Pick<CommonFormProps<T, {}>, 'fields' | 'fieldGroup'>;
};