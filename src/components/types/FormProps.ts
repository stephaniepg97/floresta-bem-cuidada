import { ComponentType, Context } from "react";

import { Model } from "../models/Model"
import { ButtonProps } from "./ButtonProps";
import { FormContextProps } from "./FormContextProps";

import { InputProps } from "./InputProps";
import { ListContentProps } from "./ListContentProps";

export type FormState<T extends Model = {}> = {
    model: T;
};
export type FormGroupProps<T extends Model = {}, D extends Model = {}> = ({ 
    fields?: Array<InputProps<T>>;
    listProps?: Omit<ListContentProps<D>, 'FormContext'>;
    fieldGroups?: Array<Array<InputProps<T>>>;
}) & {
    title?:string;
    Button?: ComponentType<{buttonProps?: ButtonProps} & Pick<FormGroupProps<T, D>, 'fields' | 'listProps' | 'fieldGroups'>>;
};
export type FormContentProps<T extends Model = {}, D extends Model = {}> = {
    formGroups: Array<FormGroupProps<T, D>>;
    FormContext: Context<FormContextProps<T>>;
}