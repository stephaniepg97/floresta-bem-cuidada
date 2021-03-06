import { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { date } from '../../../../helpers/Helper';
import { AppContext } from '../../../contexts/AppContext';
import { InternalDocumentFormContextProvider, InternalDocumentFormContextConsumer } from '../../../contexts/InternalDocumentFormContext';
import { InternalDocument } from '../../../models/InternalDocument';
import { Item } from '../../../models/Item';
import { DocumentForm } from "../DocumentForm";
import { add } from 'ionicons/icons';
import { TipoEntidade, Filial, Entidade, NomeEntidade, IDObra, NomeObra, InternalFamily, InternalDocType } from "../../../../config.json";
import { useDialog } from '../../../hooks/Dialog';

const InternalDocumentForm: FunctionComponent<RouteComponentProps> = (props) => {
    const { token, fetchApi, setToken } = useContext(AppContext);
    const { showDialog, Dialog } = useDialog();
    useEffect(() => {
        if (!token) props.history.push("/login");
    }, [props, token])
    const model = useRef<InternalDocument>({
        Data: date(new Date()), 
        DataVencimento: date(new Date(), {days: -1, months: 1}),
        DescEntidade: 0,
        DescFinanceiro: 0,
        Serie: InternalFamily,
        TipoDoc: InternalDocType,
        TipoEntidade, Filial, Fornecedor: Entidade, IDObra, NomeFornecedor: NomeEntidade, NomeObra
    });
    return (
        <>
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
                                console.log(model.current)
                                fetchApi({route: "Internos/IntegracaoInternos/Actualiza", body: model.current, method: "POST"})
                                    .then((result) => {
                                        if (result?.statusCode === 401) setToken(null) //Unauthorized
                                        else if (!!result) showDialog(result)
                                        console.log(result)
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
                keyId: "encomenda",
                history: props.history
            }}>
                <DocumentForm<Item, InternalDocument> FormConsumer={InternalDocumentFormContextConsumer} />
            </InternalDocumentFormContextProvider>
            <Dialog />
        </>
    );
};
export default withRouter(InternalDocumentForm);        