import { Model } from "../models/Model";
import { CommonPageProps } from "./CommonPageProps";
import { FormProps } from "./FormProps";
import { RouteComponentProps } from "./RouteComponentProps";

export type FormContentProps<T extends Model, D extends Model = {}> = Omit<FormProps<T, D>, keyof CommonPageProps> & Pick<RouteComponentProps, 'keyId'>