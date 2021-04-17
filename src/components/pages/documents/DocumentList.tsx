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
import { FormContentProps } from '../../types/FormProps';

export const DocumentList = <T extends _Document = InternalDocument | PurchaseDocument, D extends Item = Item> (props: RouteComponentProps & Pick<ListPropsWithDetails<T, D>, 'details'>) => (
    <List<T, D> 
        {...props}
        model={useRef<T>({} as T)}
        searchForm={{
            formProps: {
                keyId: props.keyId,
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
                                        searchForm: {} as FormContentProps<DocumentFamily>
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
                                    title: "Obras" 
                                }} 
                                fetchApiOptions={{
                                    route: "/Plataforma/Listas/CarregaLista/adhoc?listId=C7EEB235-6C8F-EB11-81C2-BCE92FBF0A4F&listParameters=%%,%%,%%,%%,%%,%%,%%"
                                }}
                                popoverProps={{cssClass: "dialog-80x", ...popoverProps}} 
                                listProps={{
                                    fields: [{
                                        label: "Código",
                                        inputProps: {
                                            name: "Codigo",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Descrição",
                                        inputProps: {
                                            name: "Descricao",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Entidade A",
                                        inputProps: {
                                            name: "EntidadeA",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Estado",
                                        inputProps: {
                                            name: "NomeEstado",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Armazém Principal",
                                        inputProps: {
                                            name: "NomeArmazemObra",
                                            readonly: true,
                                        }
                                    }],
                                    searchForm: {
                                        formProps: {
                                            keyId: `${props.keyId}-construction`,
                                            model: useRef({} as Construction),
                                            formGroups: [{
                                                fieldGroups: [
                                                    [{
                                                        label: "Código",
                                                        inputProps: {
                                                            name: "Codigo",
                                                        }
                                                    }, {
                                                        label: "Estado",
                                                        inputProps: {
                                                            name: "NomeEstado",
                                                        }
                                                    }, {
                                                        label: "Entidade A",
                                                        inputProps: {
                                                            name: "EntidadeA",
                                                        }
                                                    }]
                                                ]
                                            }, {
                                                fields: [{
                                                    label: "Descrição",
                                                    inputProps: {
                                                        name: "Descricao",
                                                        readonly: true,
                                                    }
                                                }, {
                                                    label: "Armazém Principal",
                                                    inputProps: {
                                                        name: "NomeArmazemObra",
                                                        readonly: true,
                                                    }
                                                }]
                                            }]
                                        }
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
                                    title: "Fornecedores" 
                                }}
                                fetchApiOptions={{
                                    route: "/Plataforma/Listas/CarregaLista/adhoc?listId=34F8318B-9E9E-EB11-81D1-BCE92FBF0A4F&listParameters=1,1,1,1,1,1,1,%%,%%,%%,%%,%%,%%,%%,%%,%%,%%,%%,%%"
                                }}
                                popoverProps={{cssClass: "dialog-95x", ...popoverProps}} 
                                listProps={{
                                    fields: [{
                                        label: "Fornecedor",
                                        inputProps: {
                                            name: "Fornecedor",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Nome",
                                        inputProps: {
                                            name: "NomeFornecedor",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "NIF",
                                        inputProps: {
                                            name: "NIF",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "País",
                                        inputProps: {
                                            name: "NomePais",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Distrito",
                                        inputProps: {
                                            name: "NomeDistrito",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Condição de Pagamento",
                                        inputProps: {
                                            name: "NomeCondPag",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Modo de Pagamento",
                                        inputProps: {
                                            name: "NomeModoPag",
                                            readonly: true,
                                        }
                                    }, {
                                        label: "Modo de Expedição",
                                        inputProps: {
                                            name: "NomeModoExp",
                                            readonly: true,
                                        }
                                    }],
                                    searchForm: {
                                        formProps: {
                                            keyId: `${props.keyId}-supplier-search`,
                                            model: useRef({} as Supplier),
                                            formGroups: [{
                                                fieldGroups: [
                                                    [{
                                                        label: "Código",
                                                        inputProps: {
                                                            name: "Fornecedor",
                                                        }
                                                    }, {
                                                        label: "NIF",
                                                        inputProps: {
                                                            name: "NIF",
                                                        }
                                                    }]
                                                ]
                                            }, {
                                                fieldGroups: [
                                                    [{
                                                        label: "País",
                                                        inputProps: {
                                                            name: "NomePais",
                                                        }
                                                    }, {
                                                        label: "Distrito",
                                                        inputProps: {
                                                            name: "NomeDistrito",
                                                        }
                                                    }]
                                                ]
                                            }, {
                                                fields: [{
                                                    label: "Nome",
                                                    inputProps: {
                                                        name: "NomeFornecedor",
                                                    }
                                                }, {
                                                    label: "Condição de Pagamento",
                                                    inputProps: {
                                                        name: "NomeCondPag",
                                                    }
                                                }, {
                                                    label: "Modo de Pagamento",
                                                    inputProps: {
                                                        name: "NomeModoPag",
                                                    }
                                                }, {
                                                    label: "Modo de Expedição",
                                                    inputProps: {
                                                        name: "NomeModoExp",
                                                    }
                                                }]
                                            }]
                                        }
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
                xfield: "Artigo",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }, {
                label: "Descrição",
                xfield: "NomeArtigo",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }, {
                label: "Quantidade",
                xfield: "Quantidade",
                Field: ({value}) => <small className="ion-text-center">{value}</small>,
            }, {
                label: "DataEntrega",
                xfield: "DataEntrega",
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
