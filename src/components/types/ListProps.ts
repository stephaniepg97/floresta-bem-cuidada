import { DetailProps } from "./DetailProps";
import { CommonListProps } from "./CommonListProps";

import { Model } from "../models/Model"
import { _Document } from "../models/Document";

export type ListProps<T extends _Document, D1 extends Model = {}, D2 extends Model = {}> = CommonListProps<T> & {
    details?: DetailProps<T, D1, D2>;
    getModel?: (model: T, details: Array<D1> | undefined) => T;
}
