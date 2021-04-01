import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import { PurchaseDocumentFormContext } from '../../../contexts/PurchaseDocumentFormContext';
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { AppRouteProps } from '../../../types/AppRouteProps';
import { FormState } from '../../../types/FormProps';
import { DocumentForm } from "../DocumentForm"

export const PurchaseDocumentForm: ComponentType<Pick<AppRouteProps, 'keyId'> & RouteComponentProps & FormState<PurchaseDocument>> = props => (
    <PurchaseDocumentFormContext.Provider value={{
        ...props,
        fetchApiOptions: {route: "document/create"},
        headerProps: {title: "Registo de Encomenda"},
        contentProps: {className: "content"},
    }}>
        <DocumentForm<PurchaseDocument> FormContext={PurchaseDocumentFormContext} />
    </PurchaseDocumentFormContext.Provider>
);