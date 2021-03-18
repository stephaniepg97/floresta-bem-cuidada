import { ComponentType } from "react";

import { Model } from "../models/Model"

import { ListProps } from "./ListProps"
import { CommonPageProps } from "./CommonPageProps";
import { InputProps } from "./InputProps";

export type FormState<T extends Model, D extends Model> = {
    List?: ComponentType<ListProps<D, any, any>>;
    model: T;
};

export type CommonFormProps<T extends Model> = {
    form: Array<{
        title?:string;
        fields: Array<InputProps<T>>
    }>
};
export type FormProps<T extends Model, D extends Model> = FormState<T, D> & CommonPageProps & CommonFormProps<T>;