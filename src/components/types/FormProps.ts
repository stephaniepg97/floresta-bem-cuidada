import { ComponentType, Consumer, Context } from "react";

import { Model } from "../models/Model"
import { ButtonProps } from "./ButtonProps";
import { DocumentFormProps } from "./DocumentFormProps";
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
    Button?: ComponentType<ButtonProps>;
};
export type FormContentProps<T extends Model = {}, D extends Model = {}> = DocumentFormProps<T, D>;