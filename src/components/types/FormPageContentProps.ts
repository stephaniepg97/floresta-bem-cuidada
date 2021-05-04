import { Model } from "../models/Model";
import { FormContextProps } from "./FormContextProps";

export type FormPageContentProps<T extends Model = {}, D extends Model = {}> = Pick<FormContextProps<T, D>, 'formGroups' | 'model' | 'keyId'>