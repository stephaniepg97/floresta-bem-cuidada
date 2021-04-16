import { _Document } from "../models/Document";
import { FormGroupProps, FormState } from "./FormProps";
import { Model } from "../models/Model";
import { PageContextProps } from "./PageContextProps";

export type FormContextProps<T extends Model = {}, D extends Model = {}> = FormState<T> & PageContextProps & {
    formGroups: FormGroupProps<T, D>[];
};