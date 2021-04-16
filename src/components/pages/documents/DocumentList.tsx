import { add, pencilSharp } from 'ionicons/icons';
import { List } from "../common/list/List"
import { RouteComponentProps } from "../../types/RouteComponentProps"
import { _Document } from "../../models/Document";
import { Item } from "../../models/Item";
import { Button } from '../common/buttons/Button';
import { InternalDocument } from '../../models/InternalDocument';
import { PurchaseDocument } from '../../models/PurchaseDocument';
import { OptionsDialog } from '../common/options-dialog/OptionsDialog';
import { Construction } from '../../models/Construction';
import { Supplier } from '../../models/Supplier';
import { DocumentFamily } from '../../models/DocumentFamily';
import { DocumentType } from '../../models/DocumentType';
import { ListPropsWithDetails } from '../../types/ListPropsWithDetails';
import { FormContextProps } from '../../types/FormContextProps';
import { useRef } from 'react';

export const DocumentList = <T extends _Document = InternalDocument | PurchaseDocument, D extends Item = Item> (props: RouteComponentProps & Pick<ListPropsWithDetails<T, D>, 'details'>) => (
    <List<T, D> 
        {...props}
        model={useRef<T>({} as T)}
        searchForm={{
            formProps: {
                ...props,
                model: useRef<T>({} as T),
                formGroups: [{
                    fieldGroups: [
                        [{
                            label: "Data Início",
                            inputProps: {
                                name: "Data",
                                type: "date",
                            }
                        }, {
                            label: "Data Fim",
                            inputProps: {
                                name: "Data",
                                type: "date",
                            }
                        }]
                    ]
                }, {
                    fieldGroups: [
                        [{
                            label: "Tipo de Documento",
                            inputProps: {
                                name: "TipoDoc",
                            },
                            OptionsDialog: (popoverProps) => (
                                <OptionsDialog<DocumentType> 
                                    {...props} 
                                    key={`${props.keyId}-documentType`}
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
                                        searchForm: {
                                            formProps: {} as FormContextProps<DocumentType>
                                        }
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
                                    key={`${props.keyId}-documentFamily`}
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
                                        searchForm: {
                                            formProps: {} as FormContextProps<DocumentFamily>
                                        }
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
                }, { 
                    fields: [{
                        label: "Obra",
                        inputProps: {
                            name: "Descricao",
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<Construction> 
                                {...props} 
                                key={`${props.keyId}-construction`}
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
                                    searchForm: {
                                        formProps: {} as FormContextProps<Construction>
                                    }
                                }}
                            />
                        ),
                    }]
                }, { 
                    fields: [{
                        label: "Fornecedor",
                        inputProps: {
                            name: "Entidade",
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<Supplier> 
                                {...props} 
                                key={`${props.keyId}-supplier`}
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
                                    searchForm: {
                                        formProps: {} as FormContextProps<Supplier>
                                    }
                                }}
                            />
                        ),
                    }]
                }]
            }}
        }
        key={props.keyId}
        contentProps={{className: "content"}}
        fields={[{
            label: "Data ",
            inputProps: {
                name: "Data",
                type: "date",
                readonly: true
            },
        }, {
            label: "Documento",
            inputProps: {
                name: "Documento",
                readonly: true
            },
        }, {
            label: "Obra",
            inputProps: {
                name: "NomeObra",
                readonly: true
            },
        }, {
            label: "Fornecedor",
            inputProps: {
                name: "Entidade",
                readonly: true
            },
        }, {
            label: "Total",
            inputProps: {
                name: "Total",
                readonly: true
            },
        }, {
            label: "",
            Field: () => (
                <Button
                    icon={{
                        icon: pencilSharp,
                        color: "dark"
                    }}
                    button={{
                        fill: "clear",
                        onClick: () => {}, //edit
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
                    ...props.headerProps?.fabButton?.button,
                    color: "primary",
                },
            }
        }}
        details={{
            ...props.details,
            columns: [{
                label: "Artigo",
                xfield: "Codigo",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }, {
                label: "Descrição",
                xfield: "Descricao",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }, {
                label: "Quantidade",
                xfield: "Quantidade",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }, {
                label: "Peso",
                xfield: "Peso",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }, {
                label: "Custo Unitário",
                xfield: "PrecUnit",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }]
        }}
        getModel={(model, details) => {
            return {
                ...model,
                Artigos: details,
            }
        }}
    />
)
