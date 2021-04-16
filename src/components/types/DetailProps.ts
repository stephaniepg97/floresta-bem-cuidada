import { OptionsFetchApi } from "./OptionsFetchApi";
import { Model } from "../models/Model";
import { _Document } from "../models/Document";
import { ColumnProps } from "../types/ColumnProps"

type CommonDetailProps<T extends Model, D extends Model> = {
    columns: Array<ColumnProps<D, T>>;
    fetchApiOptions?: (model : T) => OptionsFetchApi;
    data?: Array<D>
}

export type DetailProps<T extends Model, D1 extends Model, D2 extends Model> = CommonDetailProps<T, D1> & {
    details?: CommonDetailProps<D1, D2>
}