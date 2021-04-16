import { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { date } from '../../../../helpers/Helper';
import { AppContext } from '../../../contexts/AppContext';
import { InternalDocumentFormContextProvider, InternalDocumentFormContextConsumer } from '../../../contexts/InternalDocumentFormContext';
import { InternalDocument } from '../../../models/InternalDocument';
import { Item } from '../../../models/Item';
import { DocumentForm } from "../DocumentForm";
import { add } from 'ionicons/icons';

const InternalDocumentForm: FunctionComponent<RouteComponentProps> = (props) => {
    const {token, fetchApi} = useContext(AppContext);
    useEffect(() => {
        console.log(props)
        if (!token) props.history.push("/login");
    }, [props, token])
    const model = useRef<InternalDocument>({
        Data: date(new Date()).slice(0, 10), 
        DataVencimento: date(new Date(), {days: -1, months: 1}).slice(0, 10),
        DescEntidade: 0,
        DescFinanceiro: 0,
        TipoEntidade: "F",
        Filial: "000",
        Entidade: "",
        IDObra: "8EF50027-DA77-11E3-9978-0011503E58D7",
        Serie: "A",
        TipoDoc: "STD"
    });
    return (
        <InternalDocumentFormContextProvider value={{
            fetchApiOptions: {route: "document/create"},
            headerProps: {title: "Registo de Despesa"},
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
                            fetchApi({route: "Internos/IntegracaoInternos/Actualiza", body: model.current, method: "POST"})
                                .then((result) => {
                                    alert(result.response?.Message ?? result.error?.message);
                                    console.log(result.response?.Content)
                                    //if (!!result.response?.Content) model.current = JSON.parse(result.response?.Content);
                                })
                        },
                        color: "success",
                    },
                }]
            },
            model,
            keyId: "encomenda"
        }}>
            <DocumentForm<Item, InternalDocument> FormConsumer={InternalDocumentFormContextConsumer} />
        </InternalDocumentFormContextProvider>
    );
};
export default withRouter(InternalDocumentForm);        