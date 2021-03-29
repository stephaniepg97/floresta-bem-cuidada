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
import { OptionsDialog } from '../common/options-dialog/OptionsDialog';
import { Construction } from '../../models/Construction';
import { Supplier } from '../../models/Supplier';
import { DocumentFamily } from '../../models/DocumentFamily';
import { DocumentType } from '../../models/DocumentType';
import { ListProps } from '../../types/ListProps';

export const DocumentList = <T extends _Document = InternalDocument | PurchaseDocument, D extends Item = Item> (props: RouteComponentProps & RP<any> & Pick<ListProps<T, D>, 'details'> & {
    dataField: (string | undefined) & keyof T,
}) => (
    <AppContext.Consumer>
        {appContextProps =>
            <List<T, D> {...props} {...appContextProps}
                key={props.keyId}
                contentProps={{className: "content"}}
                fields={[{
                    label: "Data ",
                    inputProps: {
                        name: props.dataField,
                        type: "date",
                        readonly: true
                    },
                    searchForm: {
                        fieldGroup: [
                            [{
                                label: "Data Início",
                                inputProps: {
                                    name: props.dataField,
                                    type: "date",
                                }
                            }, {
                                label: "Data Fim",
                                inputProps: {
                                    name: props.dataField,
                                    type: "date",
                                }
                            }]
                        ]
                    }
                }, {
                    label: "Documento",
                    inputProps: {
                        name: "NumDoc",
                        readonly: true
                    },
                    searchForm: {
                        fieldGroup: [
                            [{
                                label: "Tipo de Documento",
                                inputProps: {
                                    name: "TipoDoc",
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
                                label: "Série de Documento",
                                inputProps: {
                                    name: "Serie",
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
                        ]
                    }
                }, {
                    label: "Obra",
                    inputProps: {
                        name: "Descricao",
                        readonly: true
                    },
                    searchForm: { 
                        fields: [{
                            label: "Obra",
                            inputProps: {
                                name: "Descricao",
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
                        }]
                    }
                }, {
                    label: "Fornecedor",
                    inputProps: {
                        name: "NomeForn",
                        readonly: true
                    },
                    searchForm: { 
                        fields: [{
                            label: "Fornecedor",
                            inputProps: {
                                name: "NomeForn",
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
                                    popoverProps={{cssClass: "dialog-80x", ...popoverProps}} 
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
                        }]
                    }
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
                    title: props?.headerProps?.title,
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
                            routerLink: props?.headerProps?.fabButton?.button?.routerLink,
                            routerDirection: "root",
                        },
                        visible: true,
                    }
                }}
                details={{
                    ...props.details,
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
