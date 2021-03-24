import React from 'react';
import { RouteComponentProps as RP } from "react-router";
import { add, pencilSharp } from 'ionicons/icons';

import { List } from "../common/list/List"

import { RouteComponentProps } from "../../types/RouteComponentProps"

import { _Document } from "../../models/Document";
import { Item } from "../../models/Item";
import { Button } from '../common/buttons/Button';
import { InternalDocument } from '../../models/InternalDocument';
import { PurchaseDocument } from '../../models/PurchaseDocument';
import { AppContext } from '../../contexts/AppContext';

export const DocumentList = <D extends _Document = InternalDocument | PurchaseDocument> ({extended, ...props}: RouteComponentProps & RP<any> & {
    extended: {
        dataField: (string | undefined) & keyof D,
        title: string,
        routeItems: string,
        routeForm: string, 
    }
}) => (
    <AppContext.Consumer>
        {appContextProps =>
            <List<D, Item, any> {...props} {...appContextProps}
                key={props.keyId}
                contentProps={{className: "content"}}
                fields={[{
                    label: "Data ",
                    inputProps: {
                        name: extended.dataField,
                        type: "date",
                        readonly: true
                    },
                    searchFields: [{
                        label: "Data Início",
                        inputProps: {
                            name: extended.dataField,
                            type: "date",
                        }
                    }, {
                        label: "Data Fim",
                        inputProps: {
                            name: extended.dataField,
                            type: "date",
                        }
                    }]
                }, {
                    label: "Nº Documento",
                    inputProps: {
                        name: "NumDoc",
                        readonly: true
                    },
                    searchFields: [{
                        label: "Tipo de Documento",
                        inputProps: {
                            name: "TipoDoc",
                        },
                    }, {
                        label: "Série de Documento",
                        inputProps: {
                            name: "Serie",
                        },
                    }, {
                        label: "Nº Inicial",
                        inputProps: {
                            name: "NumDoc",
                        },
                    }, {
                        label: "Nº Final",
                        inputProps: {
                            name: "NumDoc",
                        },
                    }]
                }, {
                    label: "Obra",
                    inputProps: {
                        name: "Descricao",
                        readonly: true
                    },
                    searchFields: [{
                        label: "Código da Obra",
                        inputProps: {
                            name: "Descricao",
                        },
                    }, {
                        label: "Nome da Obra",
                        inputProps: {
                            name: "Descricao",
                        },
                    }]
                }, {
                    label: "Fornecedor",
                    inputProps: {
                        name: "Nome",
                        readonly: true
                    },
                    searchFields: [{
                        label: "Código do Fornecedor",
                        inputProps: {
                            name: "Fornecedor",
                        },
                    }, {
                        label: "Nome do Fornecedor",
                        inputProps: {
                            name: "NomeForn",
                        },
                    }]
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
                    title: extended.title,
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
                            routerLink: extended.routeForm,
                            routerDirection: "root",
                        },
                        visible: true,
                    }
                }}
                details={{
                    fetchApiOptions: (row) => {
                        return {
                            route: extended.routeItems,
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
        }
    </AppContext.Consumer>
);
