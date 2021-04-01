import React, { ComponentType } from 'react';
import { RouteComponentProps } from "react-router";
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { AppRouteProps } from '../../../types/AppRouteProps';
import { DocumentList } from '../DocumentList';

export const PurchaseDocumentList: ComponentType<RouteComponentProps & Pick<AppRouteProps, 'keyId'>> = (props) => (
    <DocumentList<PurchaseDocument> 
        {...props}
        key={props.keyId}
        fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=B8E2A04C-B485-EB11-81AB-706655E33B46&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
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
                    routerLink: "/encomendas/form",
                    routerDirection: "root"
                },
            }
        }}
    />
);