import { _Document } from "../models/Document";
import { FormGroupProps, FormState } from "./FormProps";
import { Model } from "../models/Model";
import { PageContextProps } from "./PageContextProps";
import { MutableRefObject } from "react";

export type FormContextProps<T extends Model = {}, D extends Model = {}> = FormState<T> & PageContextProps & {
    formGroups: MutableRefObject<Array<FormGroupProps<T, {}, D>>>;
};