import React, { FunctionComponent } from 'react';
import { InternalDocument } from "../../../models/InternalDocument";
import { DocumentList } from '../DocumentList';

export const InternalDocumentList: FunctionComponent<{keyId: string;}> = (props) => (
    <DocumentList<InternalDocument> 
        {...props}
        key={props.keyId}
        fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=5A403103-B585-EB11-81AB-706655E33B46&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
        details={{
            fetchApiOptions: (row) => {
                return {
                    route: `Plataforma/Listas/CarregaLista/adhoc?listId=88CDA2EE-6D86-EB11-81AC-706655E33B46&listParameters=000,${row.NumDoc},${row.Serie},${row.TipoDoc}`,
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