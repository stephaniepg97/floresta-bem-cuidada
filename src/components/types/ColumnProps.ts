
import { Model } from "../models/Model"
import { InputProps } from "./InputProps"

export type ColumnProps<T extends Model> = InputProps<T> & {
    size?:string;
    checkbox?:boolean;
    searchFields?: Array<InputProps<T>>;
};