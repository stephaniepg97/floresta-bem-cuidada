import React, { FC } from 'react';
import { RouteComponentProps as RP } from "react-router";
import { add, save, arrowBackCircle } from 'ionicons/icons';

import { List } from "../../common/list/List"

import { RouteComponentProps } from "../../../types/RouteComponentProps"

import { InternalDocument } from "../../../models/InternalDocument";
import { Item } from "../../../models/Item";
import { IonDatetime } from '@ionic/react';
import { AppContextProps } from '../../../types/AppContextProps';

export const InternalDocumentList: FC<RouteComponentProps & AppContextProps & RP<any>> = (props) => (
    <List<InternalDocument, Item, any> 
        {...props}
        contentProps={{className: "content"}}
        bottomButtonsProps={{centered: true, fixed: true}}
        fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=D935093C-2587-EB11-81AF-706655E33B46&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%"}}
        fields={[{
            label: "Data",
            xfield: "DataDoc",
            Field: ({value}) =>
                <IonDatetime
                    className="ion-input"
                    displayFormat="DD/MM/YYYY HH:mm:ss" 
                    placeholder="Data" 
                    readonly
                    onIonChange={e => console.log(e.detail.value)}
                    {...value && {value: String(value)}}  />
        }, {
            label: "Documento",
            inputProps: {
                name: "Documento",
                readonly: true
            },
        }, {
            label: "Obra",
            inputProps: {
                name: "Descricao",
                readonly: true
            },
        }, {
            label: "Fornecedor",
            inputProps: {
                name: "Nome",
                readonly: true
            },
        }, {
            label: "Total",
            inputProps: {
                name: "TotalMerc",
                readonly: true
            },
        }]}
        headerProps={{
            ...props,
            title: "Despesas",
        }}
        bottomButtons={[{
            text: "Gravar",
            icon: {
                icon: save,
                color: "white",
            },
            label: {
                color: "white"
            },
            button: {
                slot: "fixed",
                color: "dark",
                title: "save",
                onClick: () => {},
            },
            visible: false,
        }, {
            text: "Emitir PO",
            icon: {
                icon: add,
                color: "white",
            },
            label: {
                color: "white"
            },
            button: {
                slot: "fixed",
                color: "primary",
                title: "create",
                onClick: () => {},
            },
            visible: false,
        }, {
            text: "Corrigir Transporte",
            icon: {
                icon: arrowBackCircle,
                color: "white",
            },
            label: {
                color: "white"
            },
            button: {
                slot: "fixed",
                color: "danger",
                title: "reset",
                onClick: () => {},
            },
            visible: false,
        }]}
        details={{
            fetchApiOptions: (row) => {
                return {
                    route: "document/internal/items",
                    body: JSON.stringify(row),
                    method: "POST",
                };
            },
            columns: [{
                label: "Guia",
                xfield: "Documento",
                Field: ({value}) => <small>{value}</small>,
            },{
                label: "Artigo",
                xfield: "Artigo",
                Field: ({value}) => <small>{value}</small>,
            }, {
                label: "Descrição",
                xfield: "Descricao",
                Field: ({value}) => <small>{value}</small>,
            }, {
                label: "Quantidade",
                xfield: "Quantidade",
                Field: ({value}) => <small>{value}</small>,
            }, {
                label: "Toneladas",
                xfield: "Peso",
                Field: ({value}) => <small>{value}</small>,
            }, {
                label: "Custo Unitário",
                xfield: "PrecUnit",
                Field: ({value}) => <small>{value}</small>,
            }]
        }}
        getModel={(model, details) => {
            return {
                ...model,
                Items: details,
            }
        }}
    />
);