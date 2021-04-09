import { ComponentType, Consumer, MutableRefObject } from "react";

import { Model } from "../models/Model"
import { ButtonProps } from "./ButtonProps";
import { FormContextProps } from "./FormContextProps";
import { InputProps } from "./InputProps";
import { ListContentProps } from "./ListContentProps"; 

export type FormState<T extends Model = {}> = {
    model: MutableRefObject<T>;
};
export type FormGroupProps<T extends Model = {}, D extends Model = {}> = ({ 
    fields?: Array<InputProps<T>>;
    listProps?: Omit<ListContentProps<D>, 'FormContext'>;
    fieldGroups?: Array<Array<InputProps<T>>>;
}) & {
    title?:string;
    Button?: ComponentType<ButtonProps>;
};
export type FormContentProps<T extends Model = {}, D extends Model = {}> = {
    FormConsumer: Consumer<FormContextProps<T, D>>;
    formProps?: undefined
} | {
    FormConsumer?: undefined;
    formProps: FormContextProps<T, D>;
}