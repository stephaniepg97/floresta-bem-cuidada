import { IonItem } from "@ionic/react";
import { ComponentProps, MutableRefObject } from "react";
import { Model } from "../models/Model";
import { ButtonProps } from "./ButtonProps";
import { FormState } from "./FormProps";
import { CommonInputProps } from "./InputProps";
import { ListProps } from "./ListProps";
import { ListPropsWithDetails } from "./ListPropsWithDetails";
import { RouteComponentProps } from "./RouteComponentProps";

export type ItemListPropsWithDetails<T extends Model, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T> = Omit<ListPropsWithDetails<T, {}, D1, D2, T1>, 'searchForm'> & ItemListChildProps<T, T1>;

export type ItemListProps<T extends Model, T1 extends Model = T> = Omit<ListProps<T, {}, T1>, 'searchForm'> & ItemListChildProps<T, T1>;

export type ItemListChildProps<T extends Model, T1 extends Model = T> = RouteComponentProps & FormState<T1> & Pick<CommonInputProps<T, T1>, 'xModel' | 'position'> & {
    setButtons?: (value: Array<ButtonProps> | undefined) => void;
    buttons?: Array<ButtonProps>;
    onClick?: (row: T) => void;
    itemProps?: Pick<ComponentProps<typeof IonItem>, 'detail' | 'detailIcon'>;
    selected?: React.MutableRefObject<Array<T>>;
}