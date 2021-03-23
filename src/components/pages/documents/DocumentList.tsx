import React, { FC } from 'react';
import { Redirect, RouteComponentProps as RP } from "react-router";
import { add, pencilSharp } from 'ionicons/icons';

import { List } from "../common/list/List"

import { RouteComponentProps } from "../../types/RouteComponentProps"

import { _Document } from "../../models/Document";
import { Item } from "../../models/Item";
import { IonDatetime } from '@ionic/react';
import { AppContextProps } from '../../types/AppContextProps';
import { Button } from '../common/buttons/Button';
import { InternalDocument } from '../../models/InternalDocument';
import { PurchaseDocument } from '../../models/PurchaseDocument';

export const DocumentList = <D extends _Document = InternalDocument | PurchaseDocument> (props: RouteComponentProps & AppContextProps & RP<any>) => (
    <List<D, Item, any> 
        {...props}
        contentProps={{className: "content"}}
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
        }, {
            label: "",
            Field: () => (
                <Button
                    visible 
                    icon={{
                        icon: pencilSharp,
                        color: "dark"
                    }}
                    button={{
                        fill: "clear",
                        onClick: () => {}, //edit
                        className: "end-button"
                    }}
                />
            ),
            xfield: null
        }]}
        headerProps={{
            ...props,
            title: "Despesas",
            fabButton: {
                fab: {
                    slot: "icon-only",
                    vertical: "center",
                    horizontal: "end",
                },
                icon: {
                    icon: add,
                    color: "white",
                },
                button: {
                    color: "primary",
                    routerLink: "/despesas/form",
                    onClick: () => props.history.forward()
                },
                visible: true,
            }
        }}
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