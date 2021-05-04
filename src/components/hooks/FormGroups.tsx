import { useCallback, useEffect, useRef, useState } from "react";
import { RouteComponentProps as RCP } from "react-router";
import { date } from "../../helpers/Helper";
import { Construction } from "../models/Construction";
import { _Document } from "../models/Document";
import { DocumentFamily } from "../models/DocumentFamily";
import { DocumentType } from "../models/DocumentType";
import { Item } from "../models/Item";
import { Supplier } from "../models/Supplier";
import { Button } from "../pages/common/buttons/Button";
import { OptionsDialog } from "../pages/common/options-dialog/OptionsDialog";
import { FormContextProps } from "../types/FormContextProps";
import { FormGroupProps, FormState } from "../types/FormProps";
import { InputProps } from "../types/InputProps";
import { RouteComponentProps } from "../types/RouteComponentProps";
import { add } from 'ionicons/icons';
import { SearchSupplier } from "../models/SearchSupplier";
import { SupplierList, ConstructionList, ItemsList } from "../../config.json"
import { SearchItems } from "../models/SearchItems";

export const useFormGroups = <D extends Item, T extends _Document<D>> ({model, keyId, history}: Pick<RouteComponentProps, 'keyId'> & Pick<RCP, 'history'> &  FormState<T>) => {
    const [ready, setupForm] = useState(false), 
    clickEvents = useRef<Array<{
            title: string;
            onClick: (refresh: () => void) => void;
        }>>([]), 
    formGroups = useRef<Array<FormGroupProps<T, {}, D>>>([{
        title: "Informação Geral",
        fields: [{
            label: "Obra",
            inputProps: {
                name: "NomeObra",
                updateModel: (_, value) => {
                    model.current.IDObra = value ?? model.current.IDObra
                },
                value: model.current.IDObra,
            },
            OptionsDialog: (popoverProps) => (
                <OptionsDialog<Construction, Construction, T> 
                    keyId={keyId}
                    key={`${keyId}-construction`}
                    headerProps={{ 
                        title: "Obras" 
                    }}
                    popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
                    listProps={{
                        model,
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
                            listId: ConstructionList,
                            history,
                            formProps: {
                                keyId: `${keyId}-construction-search`,
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
                        },
                    }}
                />
            ),
        }, {
            label: "Fornecedor",
            inputProps: {
                name: "NomeFornecedor",
                maxlength: 8, 
            },
            OptionsDialog: ({close, ...popoverProps}) => (
                <OptionsDialog<Supplier, SearchSupplier, T> 
                    keyId={keyId}
                    key={`${keyId}-supplier`}
                    headerProps={{ 
                        title: "Fornecedores" 
                    }}
                    popoverProps={{cssClass: "dialog-95x", ...popoverProps}} 
                    listProps={{
                        model,
                        onClick: row => close({...model.current, NomeFornecedor: row.NomeFornecedor, Fornecedor: row.Fornecedor}),
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
                                keyId: `${keyId}-supplier-search`,
                                model: useRef({} as SearchSupplier),
                                formGroups: useRef([{
                                    fieldGroups: [
                                        [{
                                            label: "Código",
                                            inputProps: {
                                                name: "nif", //todo
                                            }
                                        }, {
                                            label: "NIF",
                                            inputProps: {
                                                name: "nif",
                                            }
                                        }]
                                    ]
                                }, {
                                    fieldGroups: [
                                        [{
                                            label: "País",
                                            inputProps: {
                                                name: "nomePais",
                                            }
                                        }, {
                                            label: "Distrito",
                                            inputProps: {
                                                name: "nomeDistrito",
                                            }
                                        }]
                                    ]
                                }, {
                                    fields: [{
                                        label: "Nome",
                                        inputProps: {
                                            name: "nomePais", //todo
                                        }
                                    }, {
                                        label: "Condição de Pagamento",
                                        inputProps: {
                                            name: "nomeCondPag",
                                        }
                                    }, {
                                        label: "Modo de Pagamento",
                                        inputProps: {
                                            name: "nomeModoPag",
                                        }
                                    }, {
                                        label: "Modo de Expedição",
                                        inputProps: {
                                            name: "nomeModoExp",
                                        }
                                    }]
                                }])
                            }
                        }
                    }}
                />
            )
        }],
        fieldGroups: [
            [{
                label: "Tipo",
                inputProps: {
                    name: "TipoDoc",
                    maxlength: 10,
                    readonly: true,
                },
                OptionsDialog: (popoverProps) => (
                    <OptionsDialog<DocumentType, DocumentType> 
                        keyId={keyId}
                        key={`${keyId}-documentType`}
                        headerProps={{ 
                            title: "Tipos de Documento" 
                        }}
                        popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
                        listProps={{
                            model,
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
                                listId: "",
                                history,
                                formProps: {} as FormContextProps<DocumentType>
                            }
                        }}
                    />
                ),
            }, {
                label: "Série",
                inputProps: {
                    name: "Serie",
                    maxlength: 10,
                    readonly: true,
                },
                OptionsDialog: (popoverProps) => (
                    <OptionsDialog<DocumentFamily, DocumentFamily> 
                        keyId={keyId}
                        key={`${keyId}-documentFamily`}
                        headerProps={{ 
                            title: "Séries" 
                        }}
                        popoverProps={{cssClass: "dialog-80x", ...popoverProps}}
                        listProps={{
                            model,
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
                                listId: "",
                                history,
                                formProps: {} as FormContextProps<DocumentFamily>
                            }
                        }}
                    />
                ),
            }], [{
                label: "Data do Documento",
                inputProps: {
                    name: "Data",
                    type: "date",
                }
            }, {
                label: "Vencimento",
                inputProps: {
                    name: "DataVencimento",
                    type: "date",
                }
            }], [{
                label: "Desconto de Fornecedor",
                inputProps: {
                    name: "DescEntidade",
                    type: "number",
                    step: ".01",
                },
            }, {
                label: "Desconto Financeiro",
                inputProps: {
                    name: "DescFinanceiro",
                    type: "number",
                    step: ".01",
                }
            }]
        ]
    }, {
        title: "Anexos",
        fields: [...model.current.Anexos?.map((filename, index) => {
            return {
                label: `Ficheiro ${index + 1}`,
                inputProps: {
                    updateModel: (index, _) => {
                        model.current.Anexos = [...model.current.Anexos ?? []];
                        model.current.Anexos.splice(index, index + 1, "")
                    },
                    value: filename,
                    accept: "*"
                }
            } as InputProps<T>;
        }) ?? [], {
            label: "Novo ficheiro",
            inputProps: {
                accept: "*",
                updateModel: (index, _) => {
                    model.current.Anexos = [...model.current.Anexos ?? []];
                    model.current.Anexos.splice(index, index + 1, "");
                },
            }
        }],
        Button: ({buttonProps, refresh}) => (
            <div className="flex-row-center-content">
                <Button
                    {...buttonProps}
                    button={{
                        ...buttonProps,
                        slot: "icon-only",
                        color: "primary",
                        onClick: () => {
                            let clickEvent = clickEvents.current.find(c => c.title === "Anexos");
                            clickEvent && clickEvent.onClick(refresh);
                        },
                        className: "buttom-add-form"
                    }}
                    icon={{
                        icon: add,
                        color: "white",
                    }}
                />
            </div>
        ),
    }, {
        title: "Artigos",
        listProps: {
            keyId,
            model: useRef({} as T),
            data: model.current.Artigos || null,
            fields: [{
                label: "Artigo",
                inputProps: {
                    name: "Artigo",
                    updateModel: (position, value, xModel) => {
                        updateArtigoOnModel({position, ...!!xModel ? { xModel } : { value: value ?? "", key: "Artigo"}})
                    }
                },
                OptionsDialog: ({close, ...popoverProps}) => (
                    <OptionsDialog<D, SearchItems, T> 
                        keyId={keyId}
                        key={`${keyId}-artigos`}
                        headerProps={{ 
                            title: "Artigos" 
                        }}
                        popoverProps={{cssClass: "dialog-95x", ...popoverProps}} 
                        listProps={{
                            model,
                            onClick: row => close(row),
                            fields: [{
                                label: "Código",
                                inputProps: {
                                    name: "Artigo",
                                    readonly: true,
                                }
                            }, {
                                label: "Nome",
                                inputProps: {
                                    name: "NomeArtigo",
                                    readonly: true,
                                }
                            }, {
                                label: "Iva (%)",
                                inputProps: {
                                    name: "TaxaIva",
                                    readonly: true,
                                }
                            }, {
                                label: "Desconto (%)",
                                inputProps: {
                                    name: "Desconto",
                                    readonly: true,
                                }
                            }, {
                                label: "Fornecedor Principal",
                                inputProps: {
                                    name: "NomeFornecedorPrincipal",
                                    readonly: true,
                                }
                            }, {
                                label: "Família",
                                inputProps: {
                                    name: "NomeFamilia",
                                    readonly: true,
                                }
                            }, {
                                label: "Armazém Principal",
                                inputProps: {
                                    name: "ArmazemSugestao",
                                    readonly: true,
                                }
                            }],
                            searchForm: {
                                listId: ItemsList,
                                history,
                                formProps: {
                                    keyId: `${keyId}-artigos-search`,
                                    model: useRef({} as SearchItems),
                                    formGroups: useRef([{
                                        fields: [{
                                            label: "Código",
                                            inputProps: {
                                                name: "artigo",
                                                updateModel: (_, value, __, model) => {
                                                    if (model?.current.nomeArtigo === "%%" && !!value && value !== "") model.current = {...model.current, nomeArtigo: "NULL" }
                                                    if (!!model && (!!value && value !== "")) model.current = {...model.current, artigo: `%${value}%` }
                                                    else if (!!model) model.current = {...model.current, artigo: "%%", nomeArtigo: "%%" }
                                                }
                                            }
                                        }, {
                                            label: "Nome",
                                            inputProps: {
                                                name: "nomeArtigo",
                                                updateModel: (_, value, __, model) => {
                                                    if (model?.current.artigo === "%%" && !!value && value !== "") model.current = {...model.current, artigo: "NULL" }
                                                    if (!!model && (!!value && value !== "")) model.current = {...model.current, nomeArtigo: `%${value}%` }
                                                    else if (!!model) model.current = {...model.current, artigo: "%%", nomeArtigo: "%%" }
                                                }
                                            }
                                        }, {
                                            label: "Fornecedor Principal",
                                            inputProps: {
                                                name: "nomeFornecedor",
                                                updateModel: (_, value, __, model) => {
                                                    if (model?.current.fornecedor === "%%" && !!value && value !== "") model.current = {...model.current, fornecedor: "NULL" }
                                                    if (!!model && (!!value && value !== "")) model.current = {...model.current, nomeFornecedor: `%${value}%`, allFornecedores: "0" }
                                                    else if (!!model) model.current = {...model.current, fornecedor: "%%", nomeFornecedor: "%%", allFornecedores: "1" }
                                                }
                                            }
                                        }, {
                                            label: "Família",
                                            inputProps: {
                                                name: "nomeFamilia",
                                                updateModel: (_, value, __, model) => {
                                                    if (model?.current.familia === "%%" && !!value && value !== "") model.current = {...model.current, familia: "NULL" }
                                                    if (!!model && (!!value && value !== "")) model.current = {...model.current, nomeFamilia: `%${value}%`, allFamilias: "0" }
                                                    else if (!!model) model.current = {...model.current, familia: "%%", nomeFamilia: "%%", allFamilias: "1" }
                                                }
                                            }
                                        }]
                                    }])
                                }
                            }
                        }}
                    />
                ),
            }, {
                label: "Quantidade",
                inputProps: {
                    name: "Quantidade",
                    updateModel: (position, value) => {
                        updateArtigoOnModel({position, value: Number(value ?? 0), key: "Quantidade"})
                    }
                }
            }, {
                label: "Custo Unitário",
                inputProps: {
                    name: "PrecUnit",
                    updateModel: (position, value) => {
                        updateArtigoOnModel({position, value: Number(value ?? 0), key: "PrecUnit"})
                    }
                }
            }, {
                label: "Desconto",
                inputProps: {
                    name: "Desconto",
                    updateModel: (position, value) => {
                        updateArtigoOnModel({position, value: Number(value ?? 0), key: "Desconto"})
                    }
                },
            }, {
                label: "Data de Entrega",
                inputProps: {
                    name: "DataEntrega",
                    updateModel: (position, value) => {
                        updateArtigoOnModel({position, value: (value ?? date(new Date())), key: "DataEntrega"})
                    },
                    type: "date",
                    value: date(new Date()).slice(0, 10),
                }
            }],
            searchForm: {
                listId: "",
                history,
                formProps: {} as FormContextProps<{}>
            }
        },
        Button: ({buttonProps, refresh}) => (
            <div className="flex-row-center-content">
                <Button
                    {...buttonProps}
                    button={{
                        ...buttonProps,
                        slot: "icon-only",
                        color: "primary",
                        onClick: () => {
                            let clickEvent = clickEvents.current.find(c => c.title === "Artigos");
                            clickEvent && clickEvent.onClick(refresh);
                        },
                        className: "buttom-add-form"
                    }}
                    icon={{
                        icon: add,
                        color: "white",
                    }}
                />
            </div>
        ),
    }]);
    const updateAnexo = useCallback<(props: InputProps<T>, position?: number) => void>((props, position) => {
        const fieldGroup = formGroups.current.find(fg => fg.title === "Anexos") as FormGroupProps<T, {}, D>;
        if (position === undefined) {
            fieldGroup.fields = [...!!fieldGroup.fields ? fieldGroup.fields as InputProps<T>[] : [], props];
            return;
        }
        if (!fieldGroup.fields) fieldGroup.fields = [props];
        else if (position < fieldGroup.fields.length) fieldGroup.fields[position] = props;
    }, [formGroups]), 
    updateArtigo = useCallback<(row: D, position?: number | undefined) => void>((row, position) => {
        const fieldGroup = formGroups.current.find(fg => fg.title === "Artigos") as FormGroupProps<T, {}, D>;
        if (!fieldGroup.listProps) return;
        if (position === undefined) {
            fieldGroup.listProps.data = [...fieldGroup.listProps.data || [], row]; //model,
            console.log(fieldGroup.listProps.data)
            return;
        }
        if (!fieldGroup.listProps.data) fieldGroup.listProps.data = [row];
        else if (position < fieldGroup.listProps.data.length) fieldGroup.listProps.data[position] = row;
        console.log(fieldGroup.listProps.data)
    }, [formGroups]),
    updateArtigoOnModel = useCallback<(_: {
        position: number;
    } & ({
        value: Number | string | null;
        key: keyof D;
        xModel?: undefined;
    } | {
        xModel: D;
        value?: undefined;
        key?: undefined;
    })) => void>(({position, value, xModel, key}) => {
        if (!model.current.Artigos) {
            model.current.Artigos = [{DataEntrega: date(new Date())} as D];
            position = 0;
        } else if (position === model.current.Artigos.length) model.current.Artigos = [...model.current.Artigos, {DataEntrega: date(new Date())} as D];
        const row : D = {...model.current.Artigos[position], ...!!xModel ? xModel : { [String(key)]: value }};
        model.current.Artigos.splice(position, position + 1, row);
        updateArtigo(row, position);
    }, [updateArtigo, model]);

    useEffect(() => {
        clickEvents.current = [{
            title: "Anexos", //"Anexos": add onClick event to add button
            onClick: refresh => {
                updateAnexo({
                    label: "Novo ficheiro" , 
                    inputProps: {
                        accept: "*",
                        updateModel: (_, value) => {
                            model.current = {...model.current, Anexos: [...model.current.Anexos || [], value]}
                        },
                    }
                });
                refresh();
            }
        }, {
            title: "Artigos", //"Artigos": add onClick event to add button
            onClick: refresh => {
                updateArtigo({} as D);
                refresh();
            }
        }]
        !ready && setupForm(true)
    }, [ready, model, keyId, updateAnexo, updateArtigo])
    return { formGroups };
} 