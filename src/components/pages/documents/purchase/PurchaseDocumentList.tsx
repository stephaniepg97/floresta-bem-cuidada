import React, { ComponentType } from 'react';
import { RouteComponentProps as RP } from "react-router";
import { save, arrowBackCircle } from 'ionicons/icons';

import { List } from "../../common/list/List"

import { RouteComponentProps } from "../../../types/RouteComponentProps"

import { Item } from "../../../models/Item";
import { PurchaseDocument } from '../../../models/PurchaseDocument';
import { IonDatetime } from '@ionic/react';

export const PurchaseDocumentList: ComponentType<RouteComponentProps & RP<any>> = (props) => (
    <List<PurchaseDocument, Item, any> 
        {...props}
        contentProps={{className: "content"}}
        bottomButtonsProps={{centered: true, fixed: true}}
        fetchApiOptions={{route: "Plataforma/Listas/CarregaLista/adhoc?listId=7EA25455-2587-EB11-81AF-706655E33B46&listParameters=2999-12-12,1800-01-01,%%,%%,%%,99999,0,%%,%%,%%", credentials: 'include', referrer: 'https://pontual-3w8tvgxrz-stephaniepg97.vercel.app/'}}
        fields={[ 
        {
            label: "Data",
            xfield: "Data",
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
            title: "Encomendas",
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