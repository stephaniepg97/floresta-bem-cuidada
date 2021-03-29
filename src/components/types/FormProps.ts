import React, { ComponentType } from "react";

import { Model } from "../models/Model"

import { CommonPageProps } from "./CommonPageProps";
import { InputProps } from "./InputProps";
import { ListContentProps } from "./ListContentProps";

export type FormState<T extends Model> = {
    model: T;
};
export type CommonFormProps<T extends Model, D extends Model = {}> = ({ 
        fields?: Array<InputProps<T>>;
        listProps?: ListContentProps<D, any, any>;
        fieldGroup?: Array<Array<InputProps<T>>>;
    }) & {
        title?:string;
        Bottom?: ComponentType<FormState<T>>;
    };
export type FormProps<T extends Model, D extends Model = {}> = FormState<T> & CommonPageProps & {
    form: Array<CommonFormProps<T, D>>;
}