import { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { date } from '../../../../helpers/Helper';
import { AppContext } from '../../../contexts/AppContext';
import { PurchaseDocumentFormContextConsumer, PurchaseDocumentFormContextProvider } from '../../../contexts/PurchaseDocumentFormContext';
import { Item } from '../../../models/Item';
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentForm } from "../DocumentForm";
import { add } from 'ionicons/icons';
import { TipoEntidade, Filial, Entidade, NomeEntidade, IDObra, NomeObra, PurchaseFamily, PurchaseDocType } from "../../../../config.json";
import { useDialog } from '../../../hooks/Dialog';

const PurchaseDocumentForm: FunctionComponent<RouteComponentProps> = (props) => {
    const { token, fetchApi, setToken } = useContext(AppContext);
    const { showDialog, Dialog } = useDialog();
    const model = useRef<PurchaseDocument>({
        Data: date(new Date()), 
        DataVencimento: date(new Date(), {days: -1, months: 1}),
        DescEntidade: 0,
        DescFinanceiro: 0,
        Serie: PurchaseFamily,
        TipoDoc: PurchaseDocType,
        TipoEntidade, Filial, Fornecedor: Entidade, IDObra, NomeFornecedor: NomeEntidade, NomeObra
    });
    useEffect(() => {
        if (!token) return props.history.push("/login")
    }, [props, token]);
    return (
        <>
            <PurchaseDocumentFormContextProvider value={{
                fetchApiOptions: {route: "document/create"},
                headerProps: {title: "Registo de Encomenda"},
                contentProps: {className: "content"},
                buttonsProps: {
                    buttons: [{
                        text: "Criar",
                        icon: {
                            icon: add,
                            color: "white"
                        },
                        label: {color: "white"},
                        button: {
                            onClick: () => {
                                console.log(model.current)
                                fetchApi({route: "Compras/IntegracaoCompras/Actualiza", body: model.current, method: "POST"})
                                    .then((result) => {
                                        if (result?.statusCode === 401) setToken(null) //Unauthorized
                                        else if (!!result) showDialog(result)
                                        console.log(result?.response?.Content)
                                        return () => {
                                            result = null;
                                        };
                                    })
                            },
                            color: "success",
                        },
                    }]
                },
                model,
                keyId: "despesa",
                history: props.history
            }}>
                <DocumentForm<Item, PurchaseDocument> FormConsumer={PurchaseDocumentFormContextConsumer} />
            </PurchaseDocumentFormContextProvider>
            <Dialog />
        </>
    );
}
export default withRouter(PurchaseDocumentForm);