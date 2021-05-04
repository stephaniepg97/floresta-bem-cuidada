import { useRef } from 'react';
import { add, pencilSharp } from 'ionicons/icons';
import { List } from "../common/list/List"
import { RouteComponentProps } from "../../types/RouteComponentProps"
import { _Document } from "../../models/Document";
import { Item } from "../../models/Item";
import { Button } from '../common/buttons/Button';
import { OptionsDialog } from '../common/options-dialog/OptionsDialog';
import { Construction } from '../../models/Construction';
import { Supplier } from '../../models/Supplier';
import { DocumentFamily } from '../../models/DocumentFamily';
import { DocumentType } from '../../models/DocumentType';
import { ListPropsWithDetails } from '../../types/ListPropsWithDetails';
import { SearchDocument } from '../../models/SearchDocument';
import { FormContextProps } from '../../types/FormContextProps';
import { FormState } from '../../types/FormProps';
import { SearchProps } from '../../types/SearchProps';

export const DocumentList = <D extends Item, T extends _Document<D>> ({searchFormProps, details, ...props}: RouteComponentProps & Pick<ListPropsWithDetails<T, SearchDocument, D>, 'details'> & {
    searchFormProps: FormState<SearchDocument> & Pick<SearchProps, 'clean' | 'search'>
}) => (
    <List<T, SearchDocument, D> 
        {...props}
        model={useRef<T>({} as T)}
        searchForm={{
            ...searchFormProps,
            formProps: {
                ...searchFormProps,
                keyId: props.keyId,
                formGroups: useRef([{
                    fieldGroups: [
                        [{
                            label: "Data Início",
                            inputProps: {
                                name: "dataIni",
                                type: "date",
                            }
                        }, {
                            label: "Data Fim",
                            inputProps: {
                                name: "dataFim",
                                type: "date",
                            }
                        }]
                    ]
                }, {
                    fieldGroups: [
                        [{
                            label: "Tipo de Documento",
                            inputProps: {
                                name: "tipoDoc",
                            },
                            OptionsDialog: (popoverProps) => (
                                <OptionsDialog<DocumentType, {}, T> 
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
                                        model: useRef({} as T),
                                        onClick: () => {},
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
                                            search: () => {},
                                            clean: () => {},
                                            formProps: {} as FormContextProps<{}>
                                        }
                                    }}
                                />
                            ),
                        }, {
                            label: "Série de Documento",
                            inputProps: {
                                name: "serie",
                            },
                            OptionsDialog: (popoverProps) => (
                                <OptionsDialog<DocumentFamily, {}, T> 
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
                                        model: useRef({} as T),
                                        onClick: () => {},
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
                                            search: () => {},
                                            clean: () => {},
                                            formProps: {} as FormContextProps<{}>
                                        }
                                    }}
                                />
                            ),
                        }, {
                            label: "Nº Inicial",
                            inputProps: {
                                name: "numDocIni",
                            },
                        }, {
                            label: "Nº Final",
                            inputProps: {
                                name: "numDocFim",
                            },
                        }]
                    ]
                }, { 
                    fields: [{
                        label: "Obra",
                        inputProps: {
                            name: "nomeObra",
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<Construction, Construction> 
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
                                    model: useRef({} as T),
                                    onClick: () => {},
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
                                        search: () => {},
                                        clean: () => {},
                                        formProps: {
                                            keyId: `${props.keyId}-construction`,
                                            model: useRef({} as Construction),
                                            formGroups: useRef([{
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
                                            }])
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
                            name: "nomeEntidade",
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<Supplier, Supplier, T> 
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
                                    model: useRef({} as T),
                                    onClick: () => {},
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
                                        search: () => {},
                                        clean: () => {},
                                        formProps: {
                                            keyId: `${props.keyId}-supplier-search`,
                                            model: useRef({} as Supplier),
                                            formGroups: useRef([{
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
                                            }])
                                        }
                                    }
                                }}
                            />
                        ),
                    }]
                }])
            }
        }}
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
            ...details,
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
                label: "Data de Entrega",
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
