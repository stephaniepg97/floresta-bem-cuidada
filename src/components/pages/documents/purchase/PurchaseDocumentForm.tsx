import React, { ComponentType } from 'react';
import {
    RouteComponentProps as RP
  } from "react-router";

import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentFormProps } from '../../../types/DocumentFormProps';
import { DocumentForm } from "../DocumentForm"

export const PurchaseDocumentForm: ComponentType<DocumentFormProps<PurchaseDocument> & RP<any>> = props => (
    <DocumentForm<PurchaseDocument> 
        {...props}
        key={props.keyId}
        extended={{
            dataField: "Data",
            routeUpdate: "document/create",
            title: "Registo de Encomenda"
        }}
    />
);