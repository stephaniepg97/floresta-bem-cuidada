import { MutableRefObject } from "react";
import { Model } from "../models/Model";
import { ButtonProps } from "./ButtonProps";
import { ListPropsWithDetails } from "./ListPropsWithDetails";
import { RouteComponentProps } from "./RouteComponentProps";

export type ListContentProps<T extends Model = {}, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T> = ListPropsWithDetails<T, D1, D2, T1> & Pick<RouteComponentProps, 'keyId'> & {
    setButtons?: (value: Array<ButtonProps> | undefined) => void; 
    data: Array<T> | null;
} 