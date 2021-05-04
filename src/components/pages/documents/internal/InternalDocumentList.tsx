import { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { InternalDocument } from "../../../models/InternalDocument";
import { DocumentList } from '../DocumentList';
import { InternalList, InternalDetailList } from "../../../../config.json";
import { useListWithSearch } from '../../../hooks/ListWithSearch';
import { Item } from '../../../models/Item';
import { SearchDocument } from '../../../models/SearchDocument';

const InternalDocumentList: FunctionComponent<RouteComponentProps> = (props) => {
    const { searchModel, fetchApiOptions, setSearchModel, clean } = useListWithSearch<SearchDocument>({listId: InternalList, ...props})
    return (
        <DocumentList<Item, InternalDocument> 
            {...props}
            fetchApiOptions={fetchApiOptions}
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
            searchFormProps={{model: searchModel, search: () => setSearchModel(searchModel), clean}}
        />
    );
}
export default withRouter(InternalDocumentList);