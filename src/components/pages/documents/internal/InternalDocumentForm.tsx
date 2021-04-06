import { FunctionComponent } from 'react';
import { InternalDocumentFormContextProvider, InternalDocumentFormContextConsumer } from '../../../contexts/InternalDocumentFormContext';
import { InternalDocument } from '../../../models/InternalDocument';
import { Item } from '../../../models/Item';
import { DocumentForm } from "../DocumentForm"

export const InternalDocumentForm: FunctionComponent<{ keyId: string; }> = ({keyId}) => (
    <InternalDocumentFormContextProvider value={{
        fetchApiOptions: {route: "document/create"},
        headerProps: {title: "Registo de Despesa"},
        contentProps: {className: "content"},
        model: {} as InternalDocument,
        keyId
    }}>
        <DocumentForm<Item, InternalDocument> FormConsumer={InternalDocumentFormContextConsumer} />
    </InternalDocumentFormContextProvider>
);