import { ComponentProps, ComponentType, JSXElementConstructor } from "react";

import { Model } from "../models/Model"

import { ListProps } from "./ListProps"
import { CommonPageProps } from "./CommonPageProps";
import { InputProps } from "./InputProps";
import { RouteComponentProps } from "./RouteComponentProps";
import { AppContextProps } from "./AppContextProps";
import { ListContentProps } from "./ListContentProps";

export type FormState<T extends Model, D extends Model> = {
    listProps?: ListProps<D, any, any>;
    model: T;
};

export type CommonFormProps<T extends Model, D extends Model> = {
    form: Array<({ 
        fields: Array<Array<InputProps<T>>>;
        listProps?: undefined;
    } | {
        listProps: ListContentProps<D, any, any>;
        fields?: undefined;
    }) & {
        title?:string;
    }>
};
export type FormProps<T extends Model, D extends Model> = FormState<T, D> & CommonPageProps & CommonFormProps<T, D>;