import { InternalDocument } from '../models/InternalDocument';
import { Item } from '../models/Item';
import { FormState } from './FormProps';
import { RouteComponentProps } from './RouteComponentProps';

export type InternalDocumentFormProps = FormState<InternalDocument, Item> & RouteComponentProps