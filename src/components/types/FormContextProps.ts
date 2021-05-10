import { _Document } from "../models/Document";
import { FormGroupProps, FormState } from "./FormProps";
import { Model } from "../models/Model";
import { PageContextProps } from "./PageContextProps";
import { MutableRefObject } from "react"; 
import { CommonInputProps } from "./InputProps";

export type FormContextProps<T extends Model = {}, D extends Model = {}, T1 extends Model = T> = FormState<T1> & Pick<CommonInputProps<T, T1>, 'xModel'> & PageContextProps & {
    formGroups: MutableRefObject<Array<FormGroupProps<T, {}, D, T1>>>;
};