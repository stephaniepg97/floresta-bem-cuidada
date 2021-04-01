import { _Document } from "../models/Document";
import { FormState } from "./FormProps";
import { Model } from "../models/Model";
import { PageContextProps } from "./PageContextProps";

export type FormContextProps<T extends Model> = FormState<T> & PageContextProps;