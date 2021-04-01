import React, { ComponentType } from 'react';
import { RouteComponentProps } from "react-router";
import { InternalDocument } from "../../../models/InternalDocument";
import { AppRouteProps } from '../../../types/AppRouteProps';
import { DocumentList } from '../DocumentList';

export const InternalDocumentList: ComponentType<RouteComponentProps & Pick<AppRouteProps, 'keyId'>> = (props) => (
    <DocumentList<InternalDocument> 
        {...props}
        key={props.keyId}
        fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=D935093C-2587-EB11-81AF-706655E33B46&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
        details={{
            fetchApiOptions: (row) => {
                return {
                    route: "document/internal/items",
                    body: JSON.stringify(row),
                    method: "POST",
                };
            },
            columns: []
        }}
        headerProps={{
            title: "Despesas", 
            fabButton: {
                button: {
                    routerLink: "/despesas/form",
                    routerDirection: "root"
                },
            }
        }}
    />
);