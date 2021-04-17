import React, { FunctionComponent, useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppContext } from '../../../contexts/AppContext';
import { InternalDocument } from "../../../models/InternalDocument";
import { DocumentList } from '../DocumentList';

const InternalDocumentList: FunctionComponent<RouteComponentProps> = (props) => {
    const {token} = useContext(AppContext);
    useEffect(() => {
        console.log(props)
        if (!token) return props.history.push("/login")
    }, [props, token])
    return (
        <DocumentList<InternalDocument> 
            {...props}
            keyId="despesas"
            key="despesas"
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
}
export default withRouter(InternalDocumentList);