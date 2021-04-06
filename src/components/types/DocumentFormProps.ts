import { _Document } from '../models/Document';
import { Consumer } from 'react';
import { FormContextProps } from './FormContextProps';
import { Item } from '../models/Item';

export type DocumentFormProps<T extends _Document =_Document, D extends Item = {}> = {
    FormConsumer: Consumer<FormContextProps<T, D>>;
    formProps?: undefined
} | {
    FormConsumer?: undefined;
    formProps: FormContextProps<T, D>;
}