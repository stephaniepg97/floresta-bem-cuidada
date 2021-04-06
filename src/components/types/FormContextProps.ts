import { _Document } from "../models/Document";
import { FormGroupProps, FormState } from "./FormProps";
import { Model } from "../models/Model";
import { PageContextProps } from "./PageContextProps";

export type FormContextProps<T extends Model = {}, D extends Model = {}> = FormState<T> & PageContextProps & {
    formGroups: Array<FormGroupProps<T, D>>; 
    setFormGroups?: (formGroups: Array<FormGroupProps<T, D>>) => void
};