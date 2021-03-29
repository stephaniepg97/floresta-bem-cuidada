import React, { FC } from 'react';
import { RouteComponentProps as RP } from "react-router";

import { RouteComponentProps } from "../../../types/RouteComponentProps"

import { InternalDocument } from "../../../models/InternalDocument";
import { DocumentList } from '../DocumentList';

export const InternalDocumentList: FC<RouteComponentProps & RP<any>> = (props) => (
    <DocumentList<InternalDocument> 
        {...props}
        key={props.keyId}
        fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=D935093C-2587-EB11-81AF-706655E33B46&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
        dataField="DataDoc"
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
                    routerLink: "despesas/form",
                },
            }
        }}
    />
);