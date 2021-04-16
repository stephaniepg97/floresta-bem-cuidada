import { FunctionComponent, useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppContext } from '../../../contexts/AppContext';
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentList } from '../DocumentList';

const PurchaseDocumentList: FunctionComponent<RouteComponentProps> = (props) => {
    const { token } = useContext(AppContext);
    useEffect(() => {
        if (!token) props.history.push("/login")
    }, [props.history, token])
    return (
        <DocumentList<PurchaseDocument> 
            keyId="encomendas"
            key="encomendas"
            fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=CF56AE6F-2C9D-EB11-8113-00155D0A3600&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
            details={{
                fetchApiOptions: (row) => {
                    return {
                        route: `Plataforma/Listas/CarregaLista/adhoc?listId=6AC0B500-2D9D-EB11-8113-00155D0A3600&listParameters=000,${row.NumDoc},${row.Serie},${row.TipoDoc}`,
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
}
export default withRouter(PurchaseDocumentList);