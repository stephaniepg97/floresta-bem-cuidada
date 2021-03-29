import { _Document } from '../models/Document';
import { FormState } from './FormProps';
import { RouteComponentProps } from './RouteComponentProps';

export type DocumentFormProps<D extends _Document> = FormState<D> & RouteComponentProps