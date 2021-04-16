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
                    {...props} 
                    key={`${props.keyId}-construction`}
                    headerProps={{ 
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
                    {...props} 
                    key={`${props.keyId}-supplier`}
                    headerProps={{ 
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
                        {...props} 
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
                        {...props} 
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
                        model.Artigos.splice(index, index + 1, {...model.Artigos[index], Codigo: value ?? ""});
                        return model;
                    }
                },
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