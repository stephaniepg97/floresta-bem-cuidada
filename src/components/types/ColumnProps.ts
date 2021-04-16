
import { Model } from "../models/Model"
import { InputProps } from "./InputProps"

export type ColumnProps<T extends Model = {}, T1 extends Model = T> = InputProps<T, T1> & {
    size?:string;
    checkbox?:boolean;
};