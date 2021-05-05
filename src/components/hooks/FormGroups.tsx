import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { RouteComponentProps as RCP } from "react-router";
import { date, updateSearchModel } from "../../helpers/Helper";
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
import { SearchConstruction } from "../models/SearchConstruction";

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
            },
            OptionsDialog: ({close, ...popoverProps}) => (
                <OptionsDialog<Construction, SearchConstruction, T> 
                    keyId={keyId}
                    key={`${keyId}-construction`}
                    headerProps={{ 
                        title: "Obras" 
                    }}
                    popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
                    listProps={{
                        model,
                        onClick: row => close({...model.current, NomeObra: row.Descricao?.split(",")[0], IDObra: row.Codigo }),
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
                        onClick: row => close({...model.current, NomeFornecedor: row.NomeFornecedor?.split(",")[0], Fornecedor: row.Fornecedor}),
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
                    updateModel: (position, _) => {
                        if (!position) return;
                        model.current.Anexos = [...model.current.Anexos ?? []];
                        model.current.Anexos.splice(position, position + 1, "")
                    },
                    value: filename,
                    accept: "*"
                }
            } as InputProps<T>;
        }) ?? [], {
            label: "Novo ficheiro",
            inputProps: {
                accept: "*",
                updateModel: (position, _) => {
                    if (!position) return;
                    model.current.Anexos = [...model.current.Anexos ?? []];
                    model.current.Anexos.splice(position, position + 1, "")
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
            model,
            data: model.current.Artigos || null,
            fields: [{
                label: "Artigo",
                inputProps: {
                    name: "Artigo",
                    updateModel: (position, value, xModel) => {
                        if (position !== undefined) updateArtigoOnModel({position, ...!!xModel ? { xModel } : { value: value ?? "", key: "Artigo"}})
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
                                    model,
                                    xModel: useRef({} as SearchItems),
                                    formGroups: useRef([{
                                        fields: [{
                                            label: "Código",
                                            inputProps: {
                                                name: "artigo",
                                                updateModel: (_, value, model) => {
                                                    if (!!model) updateSearchModel(model, "artigo", value);                                   
                                                }
                                            }
                                        }, {
                                            label: "Nome",
                                            inputProps: {
                                                name: "nomeArtigo",
                                                updateModel: (_, value, model) => {
                                                    if (!!model) updateSearchModel(model, "nomeArtigo", value);             
                                                }
                                            }
                                        }, {
                                            label: "Fornecedor Principal",
                                            inputProps: {
                                                name: "nomeFornecedor",
                                                updateModel: (_, value, model) => {
                                                    if (!!model) updateSearchModel(model, "nomeFornecedor", value, "fornecedor", "allFornecedores");             
                                                }
                                            }
                                        }, {
                                            label: "Família",
                                            inputProps: {
                                                name: "nomeFamilia",
                                                updateModel: (_, value, model) => {
                                                    if (!!model) updateSearchModel(model, "nomeFamilia", value, "familia", "allFamilias");             
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
                        if (position !== undefined) updateArtigoOnModel({position, value: Number(value ?? 0), key: "Quantidade"})
                    }
                }
            }, {
                label: "Custo Unitário",
                inputProps: {
                    name: "PrecUnit",
                    updateModel: (position, value) => {
                        if (position !== undefined) updateArtigoOnModel({position, value: Number(value ?? 0), key: "PrecUnit"})
                    }
                }
            }, {
                label: "Desconto",
                inputProps: {
                    name: "Desconto",
                    updateModel: (position, value) => {
                        if (position !== undefined) updateArtigoOnModel({position, value: Number(value ?? 0), key: "Desconto"})
                    }
                },
            }, {
                label: "Data de Entrega",
                inputProps: {
                    name: "DataEntrega",
                    updateModel: (position, value) => {
                        if (position !== undefined) updateArtigoOnModel({position, value: (value ?? date(new Date())), key: "DataEntrega"})
                    },
                    type: "date",
                    value: date(new Date()).slice(0, 10),
                }
            }],
            searchForm: {
                listId: "",
                history,
                formProps: {} as FormContextProps<{}, {}, T>
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
        xModel: MutableRefObject<D>;
        value?: undefined;
        key?: undefined;
    })) => void>(({position, value, xModel, key}) => {
        console.log(model)
        if (!model.current.Artigos) {
            model.current.Artigos = [{DataEntrega: date(new Date())} as D];
            position = 0;
        } else if (position === model.current.Artigos.length) model.current.Artigos = [...model.current.Artigos, {DataEntrega: date(new Date())} as D];
        const row : D = {...model.current.Artigos[position], ...!!xModel ? xModel.current : { [String(key)]: value }};
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