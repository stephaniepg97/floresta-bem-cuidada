import React, { ComponentType } from 'react';
import { RouteComponentProps as RP } from "react-router";

import { RouteComponentProps } from "../../../types/RouteComponentProps"

import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentList } from '../DocumentList';

export const PurchaseDocumentList: ComponentType<RouteComponentProps & RP<any>> = (props) => (
    <DocumentList<PurchaseDocument> 
        {...props}
        key={props.keyId}
        fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=B8E2A04C-B485-EB11-81AB-706655E33B46&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
        dataField="Data"
        details={{
            fetchApiOptions: (row) => {
                return {
                    route: "document/purchase/items",
                    body: JSON.stringify(row),
                    method: "POST",
                };
            },
            columns: []
        }}
        headerProps={{
            title: "Encomendas", 
            fabButton: {
                button: {
                    routerLink: "encomendas/form",
                },
            }
        }}
    />
);