import { Model } from "../models/Model";
import { FormContextProps } from "./FormContextProps";

export type FormPageContentProps<T extends Model = {}, D extends Model = {}, T1 extends Model = T> = Pick<FormContextProps<T, D, T1>, 'formGroups' | 'model' | 'keyId' | 'xModel'>