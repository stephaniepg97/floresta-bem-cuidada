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

export const DocumentList = <D extends Item, T extends _Document<D>>({ details, listId, history, ...props }: Pick<ListPropsWithDetails<T, SearchDocument, D>, 'details'> & Omit<ListWithSearchProps<SearchDocument>, 'model'> & Omit<RouteComponentProps, 'fetchApiOptions'>) => (
    <List<T, SearchDocument, D, {}, T>
        {...props}
        model={useRef<T>({} as T)}
        searchForm={{
            listId,
            history,
            formProps: {
                model: useRef<T>({} as T),
                xModel: useRef({} as SearchDocument),
                keyId: props.keyId,
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
                                updateModel: (_, value, __, model) => {
                                    if (!!model && (!!value && value !== "")) model.current = { ...model.current, tipoDoc: `%${value}%` }
                                    else if (!!model) model.current = { ...model.current, tipoDoc: "%%" }
                                }
                            },
                            OptionsDialog: (popoverProps) => (
                                <OptionsDialog<DocumentType, {}, T>
                                    {...props}
                                    key={`${props.keyId}-documentType`}
                                    headerProps={{
                                        ...props,
                                        title: "Tipos de Documento"
                                    }}
                                    popoverProps={{ cssClass: "dialog-50x", ...popoverProps }}
                                    listProps={{
                                        model: useRef({} as T),
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
                                            formProps: {} as FormContextProps<{}, {}, T>
                                        }
                                    }}
                                />
                            ),
                        }, {
                            label: "Série de Documento",
                            inputProps: {
                                name: "serie",
                                updateModel: (_, value, __, model) => {
                                    if (!!model && (!!value && value !== "")) model.current = { ...model.current, serie: `%${value}%` }
                                    else if (!!model) model.current = { ...model.current, serie: "%%" }
                                }
                            },
                            OptionsDialog: (popoverProps) => (
                                <OptionsDialog<DocumentFamily, {}, T>
                                    {...props}
                                    key={`${props.keyId}-documentFamily`}
                                    headerProps={{
                                        ...props,
                                        title: "Séries"
                                    }}
                                    popoverProps={{ cssClass: "dialog-80x", ...popoverProps }}
                                    listProps={{
                                        model: useRef({} as T),
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
                                            formProps: {} as FormContextProps<{}, {}, T>
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
                                if (model?.current.obra === "%%" && !!value && value !== "") model.current = {...model.current, obra: "NULL" }
                                if (!!model && (!!value && value !== "")) model.current = {...model.current, nomeObra: `%${value}%` }
                                else if (!!model) model.current = {...model.current, obra: "%%", nomeObra: "%%" }
                            }
                        },
                        OptionsDialog: ({close, model, ...popoverProps}) => (
                            <OptionsDialog<Construction, SearchConstruction, T> 
                                keyId={props.keyId}
                                key={`${props.keyId}-construction`}
                                headerProps={{ 
                                    title: "Obras" 
                                }}
                                popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
                                listProps={{
                                    model,
                                    onClick: row => close({...model.current, NomeObra: row.Descricao, IDObra: row.Codigo }),
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
                                            keyId: `${props.keyId}-construction-search`,
                                            model: useRef<T>({} as T),
                                            xModel: useRef({} as Construction),
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
                    }]
                }, {
                    fields: [{
                        label: "Fornecedor",
                        inputProps: {
                            name: "nomeEntidade",
                            updateModel: (_, value, model) => {
                                if (model?.current.entidade === "%%" && !!value && value !== "") model.current = {...model.current, entidade: "NULL" }
                                if (!!model && (!!value && value !== "")) model.current = {...model.current, nomeEntidade: `%${value}%` }
                                else if (!!model) model.current = {...model.current, entidade: "%%", nomeEntidade: "%%" }
                            }
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<Supplier, Supplier, T>
                                {...props}
                                key={`${props.keyId}-supplier`}
                                headerProps={{
                                    title: "Fornecedores"
                                }}
                                popoverProps={{ cssClass: "dialog-95x", ...popoverProps }}
                                listProps={{
                                    model: useRef({} as T),
                                    onClick: () => { },
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
                                        listId: SupplierList,
                                        history,
                                        formProps: {
                                            keyId: `${props.keyId}-supplier-search`,
                                            model: useRef<T>({} as T),
                                            xModel: useRef({} as Supplier),
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
        contentProps={{ className: "content" }}
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
)
