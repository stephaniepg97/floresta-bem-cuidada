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
import { ListWithSearchProps } from '../../types/SearchProps';
import { SupplierList, ConstructionList } from "../../../config.json"
import { SearchConstruction } from '../../models/SearchConstruction';
import { updateSearchModel } from '../../../helpers/Helper';
import { SearchSupplier } from '../../models/SearchSupplier';

export const DocumentList = <D extends Item, T extends _Document<D>>({ details, listId, history, keyId, ...props }: Pick<ListPropsWithDetails<T, SearchDocument, D>, 'details'> & Omit<ListWithSearchProps<SearchDocument>, 'model'> & Omit<RouteComponentProps, 'fetchApiOptions'>) => {
    const model = useRef({} as SearchDocument);
    return (
        <List<T, SearchDocument, D, {}, SearchDocument>
            {...props}
            keyId={keyId}
            model={model}
            key={keyId}
            contentProps={{ className: "content" }}
            searchForm={{
                listId,
                history,
                formProps: {
                    model,
                    xModel: model,
                    keyId,
                    formGroups: useRef([{
                        fieldGroups: [
                            [{
                                label: "Data Início",
                                inputProps: {
                                    name: "dataIni",
                                    updateModel: (_, value, model) => {
                                        if (!!model) model.current.dataIni = value?.slice(0, 10);
                                    },
                                    type: "date",
                                }
                            }, {
                                label: "Data Fim",
                                inputProps: {
                                    name: "dataFim",
                                    updateModel: (_, value, model) => {
                                        if (!!model) model.current.dataFim = value?.slice(0, 10);
                                    },
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
                                    updateModel: (_, value, model) => {
                                        if (!!model) updateSearchModel(model, "tipoDoc", value);   
                                    }
                                },
                                OptionsDialog: ({close, model, ...popoverProps}) => (
                                    <OptionsDialog<DocumentType, {}, SearchDocument>
                                        keyId={keyId}
                                        key={`${keyId}-documentType`}
                                        headerProps={{
                                            ...props,
                                            title: "Tipos de Documento"
                                        }}
                                        popoverProps={{ cssClass: "dialog-50x", ...popoverProps }}
                                        listProps={{
                                            model,
                                            onClick: () => { },
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
                                                listId: "",
                                                history,
                                                formProps: {} as FormContextProps<{}, {}, SearchDocument>
                                            }
                                        }}
                                    />
                                ),
                            }, {
                                label: "Série de Documento",
                                inputProps: {
                                    name: "serie",
                                    updateModel: (_, value, model) => {
                                        if (!!model) updateSearchModel(model, "serie", value);   
                                    }
                                },
                                OptionsDialog: ({close, model, ...popoverProps}) => (
                                    <OptionsDialog<DocumentFamily, {}, SearchDocument>
                                        keyId={keyId}
                                        key={`${keyId}-documentFamily`}
                                        headerProps={{
                                            ...props,
                                            title: "Séries"
                                        }}
                                        popoverProps={{ cssClass: "dialog-80x", ...popoverProps }}
                                        listProps={{
                                            model,
                                            onClick: () => { },
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
                                                listId: "",
                                                history,
                                                formProps: {} as FormContextProps<{}, {}, SearchDocument>
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
                                updateModel: (_, value, model) => {
                                    console.log(model)
                                    if (!!model) updateSearchModel(model, "nomeObra", value, "obra");   
                                }
                            },
                            OptionsDialog: ({close, model, ...popoverProps}) => (
                                <OptionsDialog<Construction, SearchConstruction, SearchDocument> 
                                    keyId={keyId}
                                    key={`${keyId}-construction`}
                                    headerProps={{ 
                                        title: "Obras" 
                                    }}
                                    popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
                                    listProps={{
                                        model,
                                        onClick: row => close({...model.current, nomeObra: row.Descricao?.split(",")[0], obra: row.Codigo }),
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
                                            listId: ConstructionList,
                                            history,
                                            formProps: {
                                                keyId: `${keyId}-construction-search`,
                                                model,
                                                xModel: useRef({} as SearchConstruction),
                                                formGroups: useRef([{
                                                    fieldGroups: [
                                                        [{
                                                            label: "Cód. Obra",
                                                            inputProps: {
                                                                name: "codigo",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "codigo", value);             
                                                                }
                                                            }
                                                        }, {
                                                            label: "Estado",
                                                            inputProps: {
                                                                name: "nomeEstado",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "nomeEstado", value, "estado", "allEstados");             
                                                                }
                                                            }
                                                        }, {
                                                            label: "Entidade A",
                                                            inputProps: {
                                                                name: "entidadeA",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "entidadeA", value);             
                                                                }
                                                            }
                                                        }]
                                                    ]
                                                }, {
                                                    fields: [{
                                                        label: "Nome da Obra",
                                                        inputProps: {
                                                            name: "descricao",
                                                            updateModel: (_, value, model) => {
                                                                if (!!model) updateSearchModel(model, "descricao", value);             
                                                            }
                                                        }
                                                    }, {
                                                        label: "Armazém Principal",
                                                        inputProps: {
                                                            name: "nomeArmazemObra",
                                                            updateModel: (_, value, model) => {
                                                                if (!!model) updateSearchModel(model, "nomeArmazemObra", value, "armazemObra", "allArmazensObra");             
                                                            }
                                                        }
                                                    }]
                                                }])
                                            }
                                        },
                                    }}
                                />
                            ),
                        }, {
                            label: "Fornecedor",
                            inputProps: {
                                name: "nomeEntidade",
                                maxlength: 8, 
                                updateModel: (_, value, model) => {
                                    if (!!model) updateSearchModel(model, "nomeEntidade", value, "entidade");   
                                }
                            },
                            OptionsDialog: ({close, model, ...popoverProps}) => (
                                <OptionsDialog<Supplier, SearchSupplier, SearchDocument> 
                                    keyId={keyId}
                                    key={`${keyId}-supplier`}
                                    headerProps={{ 
                                        title: "Fornecedores" 
                                    }}
                                    popoverProps={{cssClass: "dialog-95x", ...popoverProps}} 
                                    listProps={{
                                        model,
                                        onClick: row => close({...model.current, nomeEntidade: row.NomeFornecedor?.split(",")[0], entidade: row.Fornecedor}),
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
                                            label: "Localidade",
                                            inputProps: {
                                                name: "Localidade",
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
                                            listId: SupplierList,
                                            history,
                                            formProps: {
                                                keyId: `${keyId}-supplier-search`,
                                                model,
                                                xModel: useRef({} as SearchSupplier),
                                                formGroups: useRef([{
                                                    fieldGroups: [
                                                        [{
                                                            label: "Cód. Fornecedor",
                                                            inputProps: {
                                                                name: "fornecedor",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "fornecedor", value);             
                                                                }
                                                            }
                                                        }, {
                                                            label: "NIF",
                                                            inputProps: {
                                                                name: "nif",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "nif", value, undefined, "allNifs");             
                                                                }
                                                            }
                                                        }]
                                                    ]
                                                }, {
                                                    fields: [{
                                                        label: "Nome do Fornecedor",
                                                        inputProps: {
                                                            name: "nomeFornecedor",
                                                            updateModel: (_, value, model) => {
                                                                if (!!model) updateSearchModel(model, "nomeFornecedor", value);             
                                                            }
                                                        }
                                                    }],
                                                }, {
                                                    fieldGroups: [
                                                        [{
                                                            label: "País",
                                                            inputProps: {
                                                                name: "nomePais",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "nomePais", value, "pais", "allPaises");             
                                                                }
                                                            }
                                                        }, {
                                                            label: "Distrito",
                                                            inputProps: {
                                                                name: "nomeDistrito",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "nomeDistrito", value, "distrito", "allDistritos");             
                                                                }
                                                            }
                                                        }, {
                                                            label: "Localidade",
                                                            inputProps: {
                                                                name: "localidade",
                                                                updateModel: (_, value, model) => {
                                                                    if (!!model) updateSearchModel(model, "localidade", value, undefined, "allLocalidades");             
                                                                }
                                                            }
                                                        }]
                                                    ]
                                                }, {
                                                    fields: [{
                                                        label: "Condição de Pagamento",
                                                        inputProps: {
                                                            name: "nomeCondPag",
                                                            updateModel: (_, value, model) => {
                                                                if (!!model) updateSearchModel(model, "nomeCondPag", value, "condPag", "allCondPag");             
                                                            }
                                                        }
                                                    }, {
                                                        label: "Modo de Pagamento",
                                                        inputProps: {
                                                            name: "nomeModoPag",
                                                            updateModel: (_, value, model) => {
                                                                if (!!model) updateSearchModel(model, "nomeModoPag", value, "modoPag", "allModosPag");             
                                                            }
                                                        }
                                                    }, {
                                                        label: "Modo de Expedição",
                                                        inputProps: {
                                                            name: "nomeModoExp",
                                                            updateModel: (_, value, model) => {
                                                                if (!!model) updateSearchModel(model, "nomeModoExp", value, "modoExp", "allModosExp");             
                                                            }
                                                        }
                                                    }]
                                                }])
                                            }
                                        }
                                    }}
                                />
                            )
                        }]
                    }
                ])
            }}}
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
                    name: "NomeFornecedor",
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
                            onClick: () => { }, //edit
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
                    Field: ({ value }) => <small className="ion-text-center">{value}</small>,
                }, {
                    label: "Descrição",
                    xfield: "NomeArtigo",
                    Field: ({ value }) => <small className="ion-text-center">{value}</small>,
                }, {
                    label: "Quantidade",
                    xfield: "Quantidade",
                    Field: ({ value }) => <small className="ion-text-center">{value}</small>,
                }, {
                    label: "Data de Entrega",
                    xfield: "DataEntrega",
                    Field: ({ value }) => <small className="ion-text-center">{value}</small>,
                }, {
                    label: "Custo Unitário",
                    xfield: "PrecUnit",
                    Field: ({ value }) => <small className="ion-text-center">{value}</small>,
                }]
            }}
            getModel={(model, details) => {
                return {
                    ...model,
                    Artigos: details,
                }
            }}
        />
    );
}
