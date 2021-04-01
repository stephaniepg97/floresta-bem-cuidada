import React, { ComponentType } from 'react';
import { InternalDocumentFormContext } from '../../../contexts/InternalDocumentFormContext';
import { InternalDocument } from '../../../models/InternalDocument';
import { AppRouteProps } from '../../../types/AppRouteProps';
import { RouteComponentProps } from "react-router";
import { DocumentForm } from "../DocumentForm"
import { FormState } from '../../../types/FormProps';

export const InternalDocumentForm: ComponentType<Pick<AppRouteProps, 'keyId'> & RouteComponentProps & FormState<InternalDocument>> = props => (
    <InternalDocumentFormContext.Provider value={{
        ...props,
        fetchApiOptions: {route: "document/create"},
        headerProps: {title: "Registo de Despesa"},
        contentProps: {className: "content"},
    }}>
        <DocumentForm<InternalDocument> FormContext={InternalDocumentFormContext} />
    </InternalDocumentFormContext.Provider>
);