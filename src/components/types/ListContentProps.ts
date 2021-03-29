import { Model } from "../models/Model";
import { ButtonProps } from "./ButtonProps";
import { ListProps } from "./ListProps";
import { RouteComponentProps } from "./RouteComponentProps";

export type ListContentProps<T extends Model = {}, D1 extends Model = {}, D2 extends Model = {}> = ListProps<T, D1, D2> & Pick<RouteComponentProps, 'keyId'> & {
    setButtons?: (value: Array<ButtonProps> | undefined) => void; 
    data: Array<T> | null;
} 