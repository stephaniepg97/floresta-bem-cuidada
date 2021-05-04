import { DetailProps } from "./DetailProps";
import { ListProps as ListProps } from "./ListProps";

import { Model } from "../models/Model"
import { _Document } from "../models/Document";
import { SearchType } from "../models/Search";

export type ListPropsWithDetails<T extends Model, SearchT extends SearchType, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T> = Omit<ListProps<T, SearchT, T1>, 'onClick'> & {
    details: DetailProps<T, D1, D2>;
    getModel?: (model: T, value: object) => T;
}
