import { ComponentType, Consumer, MutableRefObject } from "react";

import { Model } from "../models/Model"
import { SearchType } from "../models/Search";
import { ButtonProps } from "./ButtonProps";
import { FormContextProps } from "./FormContextProps";
import { FormPageContentProps } from "./FormPageContentProps";
import { InputProps } from "./InputProps";
import { ListContentProps } from "./ListContentProps"; 

export type FormState<T extends Model = {}> = {
    model: MutableRefObject<T>;
};
export type FormGroupProps<T extends Model, SearchT extends SearchType = {}, D extends Model = {}, T1 extends Model = T> = { 
    fields?: Array<Omit<InputProps<T, T1>, 'model'>>;
    listProps?: ListContentProps<D, SearchT, {}, {}, T1>;
    fieldGroups?: Array<Array<Omit<InputProps<T, T1>, 'model'>>>;
    title?:string;
    Button?: ComponentType<{buttonProps?: ButtonProps; refresh: () => void; }>;
};
export type FormContentProps<T extends Model = {}, D extends Model = {}, T1 extends Model = T> = {
    FormConsumer: Consumer<FormContextProps<T, D, T1>>;
    formProps?: undefined
} | {
    FormConsumer?: undefined;
    formProps: FormContextProps<T, D, T1>;
}