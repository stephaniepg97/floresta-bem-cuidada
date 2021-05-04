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
export type FormGroupProps<T extends Model, SearchT extends SearchType = {}, D extends Model = {}> = { 
    fields?: Array<InputProps<T>>;
    listProps?: ListContentProps<D, SearchT, {}, {}, T>;
    fieldGroups?: Array<Array<InputProps<T>>>;
    title?:string;
    Button?: ComponentType<{buttonProps?: ButtonProps; refresh: () => void; }>;
};
export type FormContentProps<T extends Model = {}, D extends Model = {}> = {
    FormConsumer: Consumer<FormContextProps<T, D>>;
    formProps?: undefined
} | {
    FormConsumer?: undefined;
    formProps: FormContextProps<T, D>;
}