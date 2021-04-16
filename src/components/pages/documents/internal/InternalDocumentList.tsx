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
            fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=366A6D1F-2C9D-EB11-8113-00155D0A3600&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
            details={{
                fetchApiOptions: (row) => {
                    return {
                        route: `Plataforma/Listas/CarregaLista/adhoc?listId=4077EEDB-2C9D-EB11-8113-00155D0A3600&listParameters=000,${row.NumDoc},${row.Serie},${row.TipoDoc}`,
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