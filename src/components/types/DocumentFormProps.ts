import { _Document } from '../models/Document';
import { Context } from 'react';
import { FormContextProps } from './FormContextProps';

export type DocumentFormProps<T extends _Document> = {
    FormContext: Context<FormContextProps<T>>
}