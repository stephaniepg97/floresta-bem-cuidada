import { ColumnProps } from "./ColumnProps";
import { Model } from "../models/Model";
import { PageProps } from "./PageProps";
import { PageContextProps } from "./PageContextProps";
import { Context } from "react";
import { FormContextProps } from "./FormContextProps";

export type ListProps<T extends Model> = PageProps & {
    fields: Array<ColumnProps<T>>;
    FormContext: Context<FormContextProps<T>>;
}