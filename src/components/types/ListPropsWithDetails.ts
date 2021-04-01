import { DetailProps } from "./DetailProps";
import { ListProps as ListProps } from "./ListProps";

import { Model } from "../models/Model"
import { _Document } from "../models/Document";

export type ListPropsWithDetails<T extends _Document, D1 extends Model = {}, D2 extends Model = {}> = ListProps<T> & {
    details?: DetailProps<T, D1, D2>;
    getModel?: (model: T, details: Array<D1> | undefined) => T;
}
