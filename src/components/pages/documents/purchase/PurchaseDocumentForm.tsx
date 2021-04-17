import { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { date } from '../../../../helpers/Helper';
import { AppContext } from '../../../contexts/AppContext';
import { PurchaseDocumentFormContextConsumer, PurchaseDocumentFormContextProvider } from '../../../contexts/PurchaseDocumentFormContext';
import { Item } from '../../../models/Item';
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { DocumentForm } from "../DocumentForm";
import { add } from 'ionicons/icons';

const PurchaseDocumentForm: FunctionComponent<RouteComponentProps> = (props) => {
    const { token, fetchApi } = useContext(AppContext);
    const model = useRef<PurchaseDocument>({
        Data: date(new Date()).slice(0, 10), 
        DataVencimento: date(new Date(), {days: -1, months: 1}).slice(0, 10),
        DescEntidade: 0,
        DescFinanceiro: 0,
        TipoEntidade: "F",
        Filial: "000",
        Entidade: "",
        IDObra: "8EF50027-DA77-11E3-9978-0011503E58D7",
        Serie: "2021",
        TipoDoc: "ECF" 
    });
    useEffect(() => {
        if (!token) return props.history.push("/login")
    }, [props, token]);

    return (
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
                            console.log(model.current);
                            fetchApi({route: "Compras/IntegracaoCompras/Actualiza", body: model.current, method: "POST"})
                                .then((result) => {
                                    //if (!!result.response?.Content) model.current = JSON.parse(result.response?.Content);
                                    alert(result?.response?.Message ?? result?.error?.message);
                                    console.log(result?.response?.Content)
                                })
                        },
                        color: "success",
                    },
                }]
            },
            model,
            keyId: "despesa"
        }}>
            <DocumentForm<Item, PurchaseDocument> FormConsumer={PurchaseDocumentFormContextConsumer} />
        </PurchaseDocumentFormContextProvider>
    );
}
export default withRouter(PurchaseDocumentForm);