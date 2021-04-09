import { useEffect, useState } from "react";
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

export const useFormProps = <D extends Item, T extends _Document<D>> (props: Omit<FormContextProps<T, D>, 'formGroups' | 'setFormGroups'>) => {
    const [formGroups, setFormGroups] = useState<Array<FormGroupProps<T, D>>>([{
        title: "Informação Geral",
        fields: [{
            label: "Obra",
            inputProps: {
                name: "IDObra",
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
                name: "Entidade",
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
                label: "Nº do documento",
                inputProps: {
                    name: 'NumDoc',
                    maxlength: 10,
                }
            }, {
                label: "Tipo",
                inputProps: {
                    name: 'Tipodoc',
                    maxlength: 10,
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
                    name: 'Serie',
                    maxlength: 10,
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
                    name: "Data",
                    type: "date",
                    value: date(new Date()).slice(0, 10),
                }
            }, {
                label: "Vencimento",
                inputProps: {
                    name: "DataVencimento",
                    type: "date",
                    value: date(new Date(), {days: -1, months: 1}).slice(0, 10),
                }
            }], [{
                label: "Desconto de Fornecedor",
                inputProps: {
                    name: "DescEntidade",
                    type: "number",
                    step: ".01"
                    
                },
            }, {
                label: "Desconto Financeiro",
                inputProps: {
                    name: "DescFinanceiro",
                    type: "number",
                    step: ".01"
                }
            }]
        ]
    }, {
        title: "Anexos",
        fields: [...props.model.current.Anexos?.map((filename, index) => {
            return {
                label: `Ficheiro ${index + 1}` , 
                inputProps: {
                    getModel: (model, value) => {
                        return {...model, Anexos: [...model.Anexos || [], value]}
                    },
                    value: filename,
                    accept: "*"
                }
            } as InputProps<T>;
        }) ?? [], {
            label: "Novo ficheiro" , 
            inputProps: {
                accept: "*",
                getModel: (model, value) => {
                    return {...model, Anexos: [...model.Anexos || [], value]}
                },
            }
        }],
        Button: buttonProps => (
            <div className="flex-row-center-content">
                <Button
                    {...buttonProps}
                    button={{
                        ...buttonProps,
                        slot: "icon-only",
                        color: "primary",
                        onClick: () => {
                           /* let fieldGroup = props.formGroups.find(fg => fg.title === "Anexos") as FormGroupProps<T, Item>;//, index = formGroups.indexOf(fieldGroup), formGroupsAux = [...formGroups];
                            fieldGroup.fields = [...fieldGroup.fields as InputProps<T>[], {
                                label: "Novo ficheiro" , 
                                inputProps: {
                                    accept: "*",
                                    getModel: (model, value) => {
                                        return {...model, Anexos: [...model.Anexos || [], value]}
                                    },
                                }
                            }];
                            console.log(props.formGroups.find(fg => fg.title === "Anexos"))*/
                            //formGroupsAux.splice(index, index + 1, fieldGroup);
                            //setFormGroups([...formGroups.filter(fg => fg.title !== "Anexos"), {}])
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
            data: props.model.current.Items || null,
            fields: [{
                label: "Artigo",
                inputProps: {
                    name: "Artigo",
                    readonly: true
                },
            }, {
                label: "Descrição",
                inputProps: {
                    name: "Descricao",
                    readonly: true
                },
            }, {
                label: "Quantidade",
                inputProps: {
                    name: "Quantidade",
                    readonly: true
                }
            }, {
                label: "Toneladas",
                inputProps: {
                    name: "Peso",
                    readonly: true
                }
            }, {
                label: "Custo Unitário",
                inputProps: {
                    name: "PrecUnit",
                    readonly: true
                }
            }],
            searchForm: {
                formProps: {} as FormContextProps<D>
            }
        },
        Button: buttonProps => (
            <div className="flex-row-center-content">
                <Button
                    {...buttonProps}
                    button={{
                        ...buttonProps,
                        slot: "icon-only",
                        color: "primary",
                        onClick: () => {
                            /*let fieldGroup = props.formGroups.find(fg => fg.title === "Artigos") as FormGroupProps<T, Item>;
                            if (!!fieldGroup.listProps) fieldGroup.listProps.data = [...fieldGroup.listProps.data || [], {} as Item]; //model,
                            console.log(props.formGroups.find(fg => fg.title === "Artigos"))*/
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
        //"Anexos": add onClick event to add button
        //"Artigos": add onClick event to add button
    }, [setFormGroups, formGroups])
    return [formGroups, setFormGroups];
} 