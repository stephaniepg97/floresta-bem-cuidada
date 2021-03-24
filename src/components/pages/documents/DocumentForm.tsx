import React from 'react';
import { RouteComponentProps as RP } from "react-router";

import { Form } from "../common/form/Form"
import { OptionsDialog } from '../common/options-dialog/OptionsDialog';

import { Item } from "../../models/Item"
import { Supplier } from '../../models/Supplier';
import { DocumentFormProps } from '../../types/DocumentFormProps';
import { _Document } from '../../models/Document';
import { value } from '../common/input/Input';
import { Construction } from '../../models/Construction';
import { DocumentFamily } from '../../models/DocumentFamily';
import { DocumentType } from '../../models/DocumentType';
import { InputProps } from '../../types/InputProps';

export const DocumentForm = <D extends _Document> ({model, extended, ...props}: DocumentFormProps<D> & RP<any> & {
    extended: {
        dataField: (string | undefined) & keyof D,
        routeUpdate: string,
        title: string,
    }
}) => (
    <Form<D, Item> {...props}
        key={props.keyId}
        model={model}
        contentProps={{className: "content"}}
        form={[{
            title: "Informação Geral",
            fields: [
                [{
                    label: "Nº do documento",
                    inputProps: {
                        name: 'NumDoc',
                        maxlength: 10,
                        value: model?.NumDoc,
                        
                    }
                }, {
                    label: "Tipo",
                    inputProps: {
                        name: 'TipoDoc',
                        maxlength: 10,
                        value: model?.TipoDoc,
                    },
                    OptionsDialog: (popoverProps) => (
                        <OptionsDialog<DocumentType> 
                            {...props} 
                            headerProps={{ 
                                ...props,
                                title: "Tipos de Documento" 
                            }}
                            fetchApiOptions={{
                                route: "types/all"
                            }}
                            popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
                            listProps={{
                                fields: [{
                                    label: "Código",
                                    inputProps: {
                                        name: "TipoDoc",
                                    }
                                }, {
                                    label: "Descrição",
                                    inputProps: {
                                        name: "Descricao",
                                    }
                                }],
                            }}
                        />
                    ),
                }, {
                    label: "Série",
                    inputProps: {
                        name: 'Serie',
                        maxlength: 10,
                        value: model?.Serie,
                    },
                    OptionsDialog: (popoverProps) => (
                        <OptionsDialog<DocumentFamily> 
                            {...props} 
                            headerProps={{ 
                                ...props,
                                title: "Séries" 
                            }}
                            fetchApiOptions={{
                                route: "families/all"
                            }}
                            popoverProps={{cssClass: "dialog-80x", ...popoverProps}}
                            listProps={{
                                fields: [{
                                    label: "Tipo de Documento",
                                    inputProps: {
                                        name: "TipoDoc",
                                    }
                                }, {
                                    label: "Série",
                                    inputProps: {
                                        name: "Serie",
                                    }
                                }, {
                                    label: "Descrição",
                                    inputProps: {
                                        name: "Descricao",
                                    }
                                }, {
                                    label: "Data Inicial",
                                    inputProps: {
                                        name: "DataInicial",
                                    }
                                }, {
                                    label: "Data Final",
                                    inputProps: {
                                        name: "DataFinal",
                                    }
                                }],
                            }}
                        />
                    ),
                }], [{
                    label: "Obra",
                    inputProps: {
                        name: 'Descricao',
                        value: model?.Descricao,
                    },
                    OptionsDialog: (popoverProps) => (
                        <OptionsDialog<Construction> 
                            {...props} 
                            headerProps={{ 
                                ...props,
                                title: "Obras" 
                            }}
                            fetchApiOptions={{
                                route: "obras/all"
                            }}
                            popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
                            listProps={{
                                fields: [{
                                    label: "Código",
                                    inputProps: {
                                        name: "Codigo",
                                    }
                                }, {
                                    label: "Descrição",
                                    inputProps: {
                                        name: "Descricao",
                                    }
                                }],
                            }}
                        />
                    ),
                }], [{
                    label: "Data do Documento",
                    inputProps: {
                        name: extended.dataField,
                        type: "date",
                        value: String(value(extended.dataField, model)),
                    }
                }, {
                    label: "Vencimento",
                    inputProps: {
                        name: "DataVenc",
                        type: "date",
                        value: String(value(extended.dataField, model)),
                    }
                }], [{
                    label: "Fornecedor",
                    inputProps: {
                        name: "Nome",
                        maxlength: 8,
                        value: model?.Nome
                    },
                    OptionsDialog: (popoverProps) => (
                        <OptionsDialog<Supplier> 
                            {...props} 
                            headerProps={{ 
                                ...props,
                                title: "Fornecedores" 
                            }}
                            fetchApiOptions={{
                                route: "supplier/all"
                            }}
                            popoverProps={{cssClass: "supplier-dialog", ...popoverProps}} 
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
                        />
                    ),
                }], [{
                    label: "Desconto de Fornecedor",
                    inputProps: {
                        name: "Nome",
                        value: model?.Nome,
                        type: "number",
                        step: ".01"
                        
                    },
                }, {
                    label: "Desconto Financeiro",
                    inputProps: {
                        name: "Nome",
                        value: model?.Nome,
                        type: "number",
                        step: ".01"
                    }
                }]
            ]
        }, {
            title: "Anexos",
            fields: (model?.Anexos??["Ficheiro 1", "Ficheiro 2"]).map(file => [{
                label: file, 
                Field: () => <input type="file" />,
                xfield: "Anexos"
            } as InputProps<D>])
        }, {
            title: "Artigos",
            listProps: {
                keyId: props.keyId,
                data: [{} as Item, {} as Item], //model.Items
                fields: [{
                    label: "Artigo",
                    inputProps: {
                        name: "Artigo",
                        readonly: true
                    },
                    searchFields: [{
                        label: "Código",
                        inputProps: {
                            name: "Artigo",
                        },
                    }],
                }, {
                    label: "Descrição",
                    inputProps: {
                        name: "Descricao",
                        readonly: true
                    },
                    searchFields: [{
                        label: "Descrição",
                        inputProps: {
                            name: "Descricao",
                        },
                    }],
                }, {
                    label: "Quantidade",
                    inputProps: {
                        name: "Quantidade",
                        readonly: true
                    }
                }, {
                    label: "Toneladas",
                    inputProps: {
                        name: "Peso",
                        readonly: true
                    }
                }, {
                    label: "Custo Unitário",
                    inputProps: {
                        name: "PrecUnit",
                        readonly: true
                    }
                }]
            },
        }]}
        fetchApiOptions={{route: extended.routeUpdate}}
        headerProps={{
            ...props,
            title: extended.title
        }} 
    />
);