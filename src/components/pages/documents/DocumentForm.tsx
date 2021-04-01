import { add } from 'ionicons/icons';
import { Form } from "../common/form/Form"
import { OptionsDialog } from '../common/options-dialog/OptionsDialog';
import { Item } from "../../models/Item"
import { Supplier } from '../../models/Supplier';
import { _Document } from '../../models/Document';
import { Construction } from '../../models/Construction';
import { DocumentFamily } from '../../models/DocumentFamily';
import { DocumentType } from '../../models/DocumentType';
import { InputProps } from '../../types/InputProps';
import { Button } from '../common/buttons/Button';
import { date } from '../../../helpers/Helper';
import { DocumentFormProps } from '../../types/DocumentFormProps';
import { createContext } from 'react';
import { FormContextProps } from '../../types/FormContextProps';

export const DocumentForm = <T extends _Document> ({ FormContext }: DocumentFormProps<T>) => (
    <FormContext.Consumer>
        {({model, ...props}) => (
            <Form<T, Item> 
                {...props}
                FormContext={FormContext}
                key={props.keyId}
                formGroups={[{
                    title: "Informação Geral",
                    fields: [{
                        label: "Obra",
                        inputProps: {
                            name: 'Descricao',
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<Construction> 
                                {...props} 
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
                                    FormContext: createContext<FormContextProps<Construction>>({model: {}, ...props}),
                                }}
                            />
                        ),
                    }, {
                        label: "Fornecedor",
                        inputProps: {
                            name: "Nome",
                            maxlength: 8,
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<Supplier> 
                                {...props} 
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
                                    FormContext: createContext<FormContextProps<Supplier>>({model: {}, ...props}),
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
                                name: 'TipoDoc',
                                maxlength: 10,
                            },
                            OptionsDialog: (popoverProps) => (
                                <OptionsDialog<DocumentType> 
                                    {...props} 
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
                                        FormContext: createContext<FormContextProps<DocumentType>>({model: {}, ...props}),
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
                                        FormContext: createContext<FormContextProps<DocumentFamily>>({model: {}, ...props}),
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
                                name: "DataVenc",
                                type: "date",
                                value: date(new Date(), {days: -1, months: 1}).slice(0, 10),
                            }
                        }], [{
                            label: "Desconto de Fornecedor",
                            inputProps: {
                                name: "Nome",
                                type: "number",
                                step: ".01"
                                
                            },
                        }, {
                            label: "Desconto Financeiro",
                            inputProps: {
                                name: "Nome",
                                type: "number",
                                step: ".01"
                            }
                        }]
                    ]
                }, {
                    title: "Anexos",
                    fields: [...model.Anexos?.map((filename, index) => {
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
                    Button: ({buttonProps, fields}) => (
                        <div className="flex-row-center-content">
                            <Button
                                {...buttonProps}
                                button={{
                                    ...buttonProps,
                                    slot: "icon-only",
                                    color: "primary",
                                    onClick: () => {
                                        fields = [...fields as InputProps<T>[], {
                                            label: "Novo ficheiro" , 
                                            inputProps: {
                                                accept: "*",
                                                getModel: (model, value) => {
                                                    return {...model, Anexos: [...model.Anexos || [], value]}
                                                },
                                            }
                                        }]
                                        console.log(fields)
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
                        data: model.Items || null,
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
                    },
                    Button: ({buttonProps, listProps}) => (
                        <div className="flex-row-center-content">
                            <Button
                                {...buttonProps}
                                button={{
                                    ...buttonProps,
                                    slot: "icon-only",
                                    color: "primary",
                                    onClick: () => {
                                        if (!!listProps) listProps.data = [...listProps.data || [], {} as Item]; //model,
                                        console.log(listProps)
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
                }]}
            />
        )}
    </FormContext.Consumer>
);