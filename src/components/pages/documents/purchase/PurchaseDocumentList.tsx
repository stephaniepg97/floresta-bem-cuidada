import { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentList } from '../DocumentList';
import { PurchaseList, PurchaseDetailList, PurchaseDocFamilyList, PurchaseDocTypeList } from "../../../../config.json";
import { Item } from '../../../models/Item';

const PurchaseDocumentList: FunctionComponent<RouteComponentProps> = (props) => (
    <DocumentList<Item, PurchaseDocument> 
        {...props}
        listIdDocFamilies={PurchaseDocFamilyList}
        listIdDocTypes={PurchaseDocTypeList}
        listId={PurchaseList}
        keyId="encomendas"
        key="encomendas"
        details={{
            fetchApiOptions: (row) => {
                return {
                    route: `Plataforma/Listas/CarregaLista/adhoc?listId=${PurchaseDetailList}&listParameters=000,${row.NumDoc},${row.Serie},${row.TipoDoc}`,
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
export default withRouter(PurchaseDocumentList);