import { Model } from "../models/Model";
import { SearchType } from "../models/Search";
import { ButtonProps } from "./ButtonProps";
import { FormState } from "./FormProps";
import { CommonInputProps } from "./InputProps";
import { ListProps } from "./ListProps";
import { ListPropsWithDetails } from "./ListPropsWithDetails";
import { RouteComponentProps } from "./RouteComponentProps";

export type ListContentProps<T extends Model = {}, SearchT extends SearchType = {}, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T> = Pick<RouteComponentProps, 'keyId'> & FormState<T1> & {
    setButtons?: (value: Array<ButtonProps> | undefined) => void;
    data: Array<T> | null;
} & Omit<ListPropsWithDetails<T, SearchT, D1, D2, T1>, 'details'> & (
        Pick<ListPropsWithDetails<T, SearchT, D1, D2, T1>, 'details'> & {
            onClick?: undefined
        } | Pick<ListProps<T, T1>, 'onClick'> & {
            details?: undefined;
        }
    )