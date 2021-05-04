import { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { InternalDocument } from "../../../models/InternalDocument";
import { DocumentList } from '../DocumentList';
import { InternalList, InternalDetailList } from "../../../../config.json";
import { Item } from '../../../models/Item';

const InternalDocumentList: FunctionComponent<RouteComponentProps> = (props) => (
    <DocumentList<Item, InternalDocument> 
        {...props}
        listId={InternalList}
        keyId="despesas"
        key="despesas"
        details={{
            fetchApiOptions: (row) => {
                return {
                    route: `Plataforma/Listas/CarregaLista/adhoc?listId=${InternalDetailList}&listParameters=000,${row.NumDoc},${row.Serie},${row.TipoDoc}`,
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
export default withRouter(InternalDocumentList);