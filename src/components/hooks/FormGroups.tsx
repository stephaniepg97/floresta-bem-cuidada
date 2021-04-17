import { useEffect, useRef, useState } from "react";
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
import { FormGroupProps } from "../types/FormProps";
import { InputProps } from "../types/InputProps";
import { add } from 'ionicons/icons';

export const useFormGroups = <D extends Item, T extends _Document<D>> (props: Omit<FormContextProps<T>, 'reloadForm' | 'formGroups'>) => {
    const [stateFormProps, setStateFormProps] = useState(false), 
    clickEvents = useRef<Array<{
            title: string;
            onClick: (setFormGroups: (formGroups: FormGroupProps<T, D>[]) => void) => void
        }>>([]), 
    formGroups = useRef<Array<FormGroupProps<T, D>>>([{
        title: "Informação Geral",
        fields: [{
            label: "Obra",
            inputProps: {
                getModel: (model, _, value) => {
                    model.IDObra = value ?? props.model.current.IDObra
                    return model;
                },
                value: props.model.current.IDObra,
            },
            OptionsDialog: (popoverProps) => (
                <OptionsDialog<Construction> 
                    keyId={props.keyId}
                    key={`${props.keyId}-construction`}
                    headerProps={{ 
                        title: "Obras" 
                    }}
                    fetchApiOptions={{
                        route: "/Plataforma/Listas/CarregaLista/adhoc?listId=C7EEB235-6C8F-EB11-81C2-BCE92FBF0A4F&listParameters=%%,%%,%%,%%,%%,%%,%%"
                    }}
                    popoverProps={{cssClass: "dialog-50x", ...popoverProps}} 
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
                                keyId: `${props.keyId}-construction-search`,
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
        }, {
            label: "Fornecedor",
            inputProps: {
                getModel: (model, _, value) => {
                    model.Entidade = value ?? props.model.current.Entidade
                    return model;
                },
                value: props.model.current.Entidade,
                maxlength: 8,
            },
            OptionsDialog: (popoverProps) => (
                <OptionsDialog<Supplier> 
                    keyId={props.keyId}
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
        }],
        fieldGroups: [
            [{
                label: "Tipo",
                inputProps: {
                    getModel: (model, _, value) => {
                        model.TipoDoc = value ?? props.model.current.TipoDoc;
                        return model;
                    },
                    maxlength: 10,
                    readonly: true,
                    value: props.model.current.TipoDoc,
                },
                OptionsDialog: (popoverProps) => (
                    <OptionsDialog<DocumentType> 
                        keyId={props.keyId}
                        key={`${props.keyId}-documentType`}
                        headerProps={{ 
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
                label: "Série",
                inputProps: {
                    getModel: (model, _, value) => {
                        model.Serie = value ?? props.model.current.Serie;
                        return model;
                    },
                    maxlength: 10,
                    readonly: true,
                    value: props.model.current.Serie,
                },
                OptionsDialog: (popoverProps) => (
                    <OptionsDialog<DocumentFamily> 
                        keyId={props.keyId}
                        key={`${props.keyId}-documentFamily`}
                        headerProps={{ 
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
            }], [{
                label: "Data do Documento",
                inputProps: {
                    getModel: (model, _, value) => {
                        model.Data = value ?? props.model.current.Data;
                        return model;
                    },
                    type: "date",
                    value: props.model.current.Data,
                }
            }, {
                label: "Vencimento",
                inputProps: {
                    getModel: (model, _, value) => {
                        model.DataVencimento = props.model.current.DataVencimento;
                        return model;
                    },
                    type: "date",
                    value: props.model.current.DataVencimento,
                }
            }], [{
                label: "Desconto de Fornecedor",
                inputProps: {
                    getModel: (model, _, value) => {
                        model.DescEntidade = value ? Number(value) : props.model.current.DescEntidade;
                        return model;
                    },
                    type: "number",
                    step: ".01",
                    value: props.model.current.DescEntidade,
                },
            }, {
                label: "Desconto Financeiro",
                inputProps: {
                    getModel: (model, _, value) => {
                        model.DescFinanceiro = value ? Number(value) : props.model.current.DescFinanceiro;
                        return model;
                    },
                    type: "number",
                    step: ".01",
                    value: props.model.current.DescFinanceiro,
                }
            }]
        ]
    }, {
        title: "Anexos",
        fields: [...props.model.current.Anexos?.map((filename, index) => {
            return {
                label: `Ficheiro ${index + 1}`,
                inputProps: {
                    getModel: (model, index, value) => {
                        model.Anexos = [...model.Anexos ?? []];
                        model.Anexos.splice(index, index + 1, "")
                        return model;
                    },
                    value: filename,
                    accept: "*"
                }
            } as InputProps<T>;
        }) ?? [], {
            label: "Novo ficheiro",
            inputProps: {
                accept: "*",
                getModel: (model, index, value) => {
                    model.Anexos = [...model.Anexos ?? []];
                    model.Anexos.splice(index, index + 1, "")
                    return model;
                },
            }
        }],
        Button: ({buttonProps, setFormGroups}) => (
            <div className="flex-row-center-content">
                <Button
                    {...buttonProps}
                    button={{
                        ...buttonProps,
                        slot: "icon-only",
                        color: "primary",
                        onClick: () => {
                            let clickEvent = clickEvents.current.find(c => c.title === "Anexos");
                            clickEvent && clickEvent.onClick(setFormGroups);
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
            keyId: props.keyId,
            data: props.model.current.Artigos || null,
            fields: [{
                label: "Artigo",
                inputProps: {
                    getModel: (model, index, value) => {
                        model.Artigos = model.Artigos ?? [{DataEntrega: date(new Date()).slice(0, 10)} as D];
                        if (index === model.Artigos.length) model.Artigos = [...model.Artigos, {DataEntrega: date(new Date()).slice(0, 10)} as D];
                        model.Artigos.splice(index, index + 1, {...model.Artigos[index], Artigo: value ?? ""});
                        return model;
                    }
                },
                OptionsDialog: (popoverProps) => (
                    <OptionsDialog<D> 
                        keyId={props.keyId}
                        key={`${props.keyId}-artigos`}
                        headerProps={{ 
                            title: "Artigos" 
                        }}
                        fetchApiOptions={{
                            route: "/Plataforma/Listas/CarregaLista/adhoc?listId=DBEEB01F-A49E-EB11-81D1-BCE92FBF0A4F&listParameters=1,1,%%,%%,%%,%%,%%,%%"
                        }}
                        popoverProps={{cssClass: "dialog-95x", ...popoverProps}} 
                        listProps={{
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
                                formProps: {
                                    keyId: `${props.keyId}-artigos-search`,
                                    model: useRef({} as D),
                                    formGroups: [{
                                        fieldGroups: [
                                            [{
                                                label: "Código",
                                                inputProps: {
                                                    name: "Artigo",
                                                }
                                            }, {
                                                label: "Armazém Principal",
                                                inputProps: {
                                                    name: "ArmazemSugestao",
                                                    readonly: true,
                                                }
                                            }]
                                        ]
                                    }, {
                                        fields: [{
                                            label: "Nome",
                                            inputProps: {
                                                name: "NomeArtigo",
                                                readonly: true,
                                            }
                                        }, {
                                            label: "Fornecedor Principal",
                                            inputProps: {
                                                name: "NomeFornecedorPrincipal",
                                            }
                                        }, {
                                            label: "Família",
                                            inputProps: {
                                                name: "NomeFamilia",
                                            }
                                        }]
                                    }]
                                }
                            }
                        }}
                    />
                ),
            }, {
                label: "Quantidade",
                inputProps: {
                    getModel: (model, index, value) => {
                        model.Artigos = model.Artigos ?? [{DataEntrega: date(new Date()).slice(0, 10)} as D];
                        if (index === model.Artigos.length) model.Artigos = [...model.Artigos, {DataEntrega: date(new Date()).slice(0, 10)} as D];
                        model.Artigos.splice(index, index + 1, {...model.Artigos[index], Quantidade: Number(value ?? 0)});
                        return model;
                    }
                }
            }, {
                label: "Custo Unitário",
                inputProps: {
                    getModel: (model, index, value) => {
                        model.Artigos = model.Artigos ?? [{DataEntrega: date(new Date()).slice(0, 10)} as D];
                        if (index === model.Artigos.length) model.Artigos = [...model.Artigos, {DataEntrega: date(new Date()).slice(0, 10)} as D];
                        model.Artigos.splice(index, index + 1, {...model.Artigos[index], PrecUnit: Number(value ?? 0)});
                        return model;
                    }
                }
            }, {
                label: "Desconto",
                inputProps: {
                    getModel: (model, index, value) => {
                        model.Artigos = model.Artigos ?? [{DataEntrega: date(new Date()).slice(0, 10)} as D];
                        if (index === model.Artigos.length) model.Artigos = [...model.Artigos, {DataEntrega: date(new Date()).slice(0, 10)} as D];
                        model.Artigos.splice(index, index + 1, {...model.Artigos[index], Desconto: Number(value ?? 0)});
                        return model;
                    }
                },
            }, {
                label: "Data de Entrega",
                inputProps: {
                    getModel: (model, index, value) => {
                        model.Artigos = model.Artigos ?? [{DataEntrega: date(new Date()).slice(0, 10)} as D];
                        if (index === model.Artigos.length) model.Artigos = [...model.Artigos, {DataEntrega: date(new Date()).slice(0, 10)} as D];
                        model.Artigos.splice(index, index + 1, {...model.Artigos[index], DataEntrega: value ?? date(new Date()).slice(0, 10)});
                        return model;
                    },
                    type: "date",
                    value: date(new Date()).slice(0, 10),
                }
            }],
            searchForm: {
                formProps: {} as FormContextProps<D>
            }
        },
        Button: ({buttonProps, setFormGroups}) => (
            <div className="flex-row-center-content">
                <Button
                    {...buttonProps}
                    button={{
                        ...buttonProps,
                        slot: "icon-only",
                        color: "primary",
                        onClick: () => {
                            let clickEvent = clickEvents.current.find(c => c.title === "Artigos");
                            clickEvent && clickEvent.onClick(setFormGroups);
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
    useEffect(() => {
        clickEvents.current = [{
            title: "Anexos", //"Anexos": add onClick event to add button
            onClick: setFormGroups => {
                let fieldGroup = formGroups.current.find(fg => fg.title === "Anexos") as FormGroupProps<T, D>;//, index = formGroups.indexOf(fieldGroup), formGroupsAux = [...formGroups];
                fieldGroup.fields = [...fieldGroup.fields as InputProps<T>[], {
                    label: "Novo ficheiro" , 
                    inputProps: {
                        accept: "*",
                        getModel: (model, value) => {
                            return {...model, Anexos: [...model.Anexos || [], value]}
                        },
                    }
                }];
                let index = formGroups.current.indexOf(fieldGroup);
                formGroups.current.splice(index, index, fieldGroup);
                setFormGroups([...formGroups.current]);
            }
        }, {
            title: "Artigos", //"Artigos": add onClick event to add button
            onClick: setFormGroups => {
                let fieldGroup = formGroups.current.find(fg => fg.title === "Artigos") as FormGroupProps<T, D>;
                if (!!fieldGroup.listProps) {
                    fieldGroup.listProps.data = [...fieldGroup.listProps.data || [], {} as D]; //model,
                }
                let index = formGroups.current.indexOf(fieldGroup);
                formGroups.current.splice(index, index, fieldGroup);
                setFormGroups([...formGroups.current]);
                
            }
        }]
        !stateFormProps && setStateFormProps(!stateFormProps)
    }, [stateFormProps, props.model])
    return { formGroups: formGroups.current };
} 