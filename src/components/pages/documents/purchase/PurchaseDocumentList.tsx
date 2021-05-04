import { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentList } from '../DocumentList';
import { PurchaseList, PurchaseDetailList } from "../../../../config.json";
import { useListWithSearch } from '../../../hooks/ListWithSearch';
import { Item } from '../../../models/Item';
import { SearchDocument } from '../../../models/SearchDocument';

const PurchaseDocumentList: FunctionComponent<RouteComponentProps> = (props) => {
    const { searchModel, fetchApiOptions, setSearchModel, clean, setFetchApiOptions } = useListWithSearch<SearchDocument>({listId: PurchaseList, ...props})
    useEffect(() => {
        console.log(fetchApiOptions)
    }, [fetchApiOptions])
    return (
        <DocumentList<Item, PurchaseDocument> 
            {...props}
            keyId="encomendas"
            key="encomendas"
            fetchApiOptions={fetchApiOptions}
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
            searchFormProps={{model: searchModel, search: () => setSearchModel(searchModel), clean}}
        />
    );
}
export default withRouter(PurchaseDocumentList);