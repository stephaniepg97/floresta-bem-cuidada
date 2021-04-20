import { Model } from "../models/Model";
import { ButtonProps } from "./ButtonProps";
import { FormState } from "./FormProps";
import { CommonInputProps } from "./InputProps";
import { ListProps } from "./ListProps";
import { ListPropsWithDetails } from "./ListPropsWithDetails";
import { RouteComponentProps } from "./RouteComponentProps";

export type ListContentProps<T extends Model = {}, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T> = Pick<RouteComponentProps, 'keyId'> & FormState<T1> & Pick<CommonInputProps<T>, 'inputRef'> & {
    setButtons?: (value: Array<ButtonProps> | undefined) => void; 
    data: Array<T> | null;
} & Omit<ListPropsWithDetails<T, T1, D2, T1>, 'details'> & (
    Pick<ListPropsWithDetails<T, D1, D2, T1>, 'details'> & {
        onClick?: undefined
    } | Pick<ListProps<T, T1>, 'onClick'> & {
        details?: undefined; 
    }
)