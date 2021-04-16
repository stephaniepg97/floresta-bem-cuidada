import { Form } from "../common/form/Form"
import { Item } from "../../models/Item"
import { _Document } from '../../models/Document';
import { FormContextProps } from '../../types/FormContextProps';
import { FormContentProps } from '../../types/FormProps';

export const DocumentForm = <D extends Item = Item, T extends _Document<D> = _Document<D>> ({FormConsumer, formProps} : FormContentProps<T, D>) => (
    !!FormConsumer 
        ? <FormConsumer>
            {formContext => <DocumentFormContent<D, T> pageProps={formContext} contentProps={{FormConsumer, formProps} as FormContentProps<T, D>} /> }
        </FormConsumer>
        : <DocumentFormContent<D, T> pageProps={formProps as FormContextProps<T, D>} contentProps={{FormConsumer, formProps} as FormContentProps<T, D>} />
);
 
const DocumentFormContent = <D extends Item = Item, T extends _Document<D> = _Document<D>> ({pageProps, contentProps}: {contentProps: FormContentProps<T, D>, pageProps: FormContextProps<T, D>}) => (
    <Form<T, D> 
        {...contentProps}
        key={pageProps.keyId}
    />
);