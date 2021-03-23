import React, { ComponentType } from 'react';
import { IonDatetime } from "@ionic/react"
import {
    RouteComponentProps as RP
  } from "react-router";

import { Form } from "../../common/form/Form"
import { OptionsDialog } from '../../common/options-dialog/OptionsDialog';

import { Item } from "../../../models/Item"
import { Supplier } from '../../../models/Supplier';
import { InternalDocument } from '../../../models/InternalDocument';
import { AppContextProps } from '../../../types/AppContextProps';
import { InternalDocumentFormProps } from '../../../types/InternalDocumentFormProps';

export const InternalDocumentForm: ComponentType<InternalDocumentFormProps & AppContextProps & RP<any>> = ({model, ...props}) => (
    <Form<InternalDocument, Item> 
        {...props}
        model={model}
        contentProps={{className: "content"}}
        form={[{
            title: "Informação Geral",
            fields: [{
                label: "Documento",
                inputProps: {
                    name: 'Documento',
                    placeholder: "Guia",
                    maxlength: 10,
                    value: model?.Documento,
                    readonly: false,
                }
            }, {
                label: "Obra",
                inputProps: {
                    name: 'Descricao',
                    placeholder: "Data",
                    value: model?.Descricao,
                    readonly: true,
                },
            }, {
                label: "Data",
                xfield: "DataDoc",
                Field: ({value}) =>
                    <IonDatetime 
                        className="ion-input"
                        displayFormat="DD/MM/YYYY HH:mm:ss" 
                        placeholder="Data" 
                        {...value && {value: String(value)}} 
                        onIonChange={e => console.log(e.detail.value)} />
            }, {
                label: "Total",
                inputProps: {
                    name: "TotalMerc",
                    placeholder: "Total",
                    value: model?.TotalMerc
                },
            }, {
                label: "Fornecedor",
                inputProps: {
                    name: "Nome",
                    placeholder: "Fornecedor",
                    maxlength: 8,
                    value: model?.Nome
                },
                OptionsDialog: (popoverProps) => 
                    <OptionsDialog<Supplier> 
                        {...props} 
                        headerProps={{ 
                            ...props,
                            title: "Fornecedores" 
                        }}
                        fetchApiOptions={{
                            route: "supplier/all"
                        }}
                        popoverProps={popoverProps} 
                        listProps={{
                            fields: [{
                                label: "Fornecedor",
                                inputProps: {
                                    name: "Fornecedor",
                                }
                            }, {
                                label: "Local",
                                inputProps: {
                                    name: "Local",
                                }
                            }, {
                                label: "Morada",
                                inputProps: {
                                    name: "Morada",
                                }
                            }, {
                                label: "Nome",
                                inputProps: {
                                    name: "Nome",
                                }
                            }, {
                                label: "Distrito",
                                inputProps: {
                                    name: "NomeDistrito",
                                }
                            }, {
                                label: "Pais",
                                inputProps: {
                                    name: "NomePais",
                                }
                            }, {
                                label: "Nº de contribuinte",
                                inputProps: {
                                    name: "NumContrib",
                                }
                            }],
                        }}
                    />,
            }]
        }]}
        fetchApiOptions={{route: "document/create"}}
        headerProps={{
            ...props,
            title: "Registo de Despesa"
        }} 
    />
);