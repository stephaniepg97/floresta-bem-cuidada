import { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { date } from '../../../../helpers/Helper';
import { AppContext } from '../../../contexts/AppContext';
import { InternalDocumentFormContextProvider, InternalDocumentFormContextConsumer } from '../../../contexts/InternalDocumentFormContext';
import { InternalDocument } from '../../../models/InternalDocument';
import { Item } from '../../../models/Item';
import { DocumentForm } from "../DocumentForm";
import { add } from 'ionicons/icons';

import config from "../../../../config.json";

const InternalDocumentForm: FunctionComponent<RouteComponentProps> = (props) => {
    const {token, fetchApi, setToken} = useContext(AppContext);
    useEffect(() => {
        console.log(props)
        if (!token) props.history.push("/login");
    }, [props, token])
    const model = useRef<InternalDocument>({
        ...config,
        Data: date(new Date()).slice(0, 10), 
        DataVencimento: date(new Date(), {days: -1, months: 1}).slice(0, 10),
        DescEntidade: 0,
        DescFinanceiro: 0,
        Serie: config.InternalFamily,
        TipoDoc: config.InternalDocType,
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
                                    if (result?.error?.status === 401) setToken(null) //Unauthorized
                                    else alert(result?.response?.Message ?? result?.error?.message)
                                    console.log(result?.response?.Content)
                                    return () => {
                                        result = null;
                                    };
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