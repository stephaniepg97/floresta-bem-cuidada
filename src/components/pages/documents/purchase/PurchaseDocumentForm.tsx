import { FunctionComponent } from 'react';
import { PurchaseDocumentFormContextConsumer, PurchaseDocumentFormContextProvider } from '../../../contexts/PurchaseDocumentFormContext';
import { Item } from '../../../models/Item';
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentForm } from "../DocumentForm"

export const PurchaseDocumentForm: FunctionComponent<{keyId: string;}> = ({keyId}) => (
    <PurchaseDocumentFormContextProvider value={{
        fetchApiOptions: {route: "document/create"},
        headerProps: {title: "Registo de Encomenda"},
        contentProps: {className: "content"},
        model: {} as PurchaseDocument,
        keyId
    }}>
        <DocumentForm<Item, PurchaseDocument> FormConsumer={PurchaseDocumentFormContextConsumer} />
    </PurchaseDocumentFormContextProvider>
);