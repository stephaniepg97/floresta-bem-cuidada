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
import { FormContextProps } from '../../types/FormContextProps';
import { FormContentProps, FormGroupProps } from '../../types/FormProps';
import { Reducer, useEffect, useReducer } from 'react';

export const DocumentForm = <D extends Item = Item, T extends _Document<D> = _Document<D>> ({FormConsumer, formProps} : FormContentProps<T, D>) => (
    <>
        {
            !!FormConsumer 
            ? <FormConsumer>
                {formContext => <DocumentFormContent<D, T> pageProps={formContext} contentProps={{FormConsumer, formProps} as FormContentProps<T, D>} /> }
            </FormConsumer>
            : <DocumentFormContent<D, T> pageProps={formProps as FormContextProps<T, D>} contentProps={{FormConsumer, formProps} as FormContentProps<T, D>} />
        }
    </>
);
 
const DocumentFormContent = <D extends Item = Item, T extends _Document<D> = _Document<D>> ({pageProps, contentProps}: {contentProps: FormContentProps<T, D>, pageProps: FormContextProps<T, D>}) => {
    const [loadedFormGroups, setLoadedFormGroups] = useReducer<Reducer<boolean, boolean>>((_, newValue) => {
        if (!!newValue && pageProps.setFormGroups) 
            pageProps.setFormGroups([{
                title: "Informação Geral",
                fields: [{
                    label: "Obra",
                    inputProps: {
                        name: 'Descricao',
                    },
                    OptionsDialog: (popoverProps) => (
                        <OptionsDialog<Construction> 
                            {...pageProps} 
                            key={`${pageProps.keyId}-construction`}
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
                        name: "Nome",
                        maxlength: 8,
                    },
                    OptionsDialog: (popoverProps) => (
                        <OptionsDialog<Supplier> 
                            {...pageProps} 
                            key={`${pageProps.keyId}-supplier`}
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
                            name: 'TipoDoc',
                            maxlength: 10,
                        },
                        OptionsDialog: (popoverProps) => (
                            <OptionsDialog<DocumentType> 
                                {...pageProps} 
                                key={`${pageProps.keyId}-documentType`}
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
                                {...pageProps} 
                                key={`${pageProps.keyId}-documentFamily`}
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
                fields: [...pageProps.model.Anexos?.map((filename, index) => {
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
                                    let fieldGroup = pageProps.formGroups.find(fg => fg.title === "Anexos") as FormGroupProps<T, Item>;//, index = formGroups.indexOf(fieldGroup), formGroupsAux = [...formGroups];
                                    fieldGroup.fields = [...fieldGroup.fields as InputProps<T>[], {
                                        label: "Novo ficheiro" , 
                                        inputProps: {
                                            accept: "*",
                                            getModel: (model, value) => {
                                                return {...model, Anexos: [...model.Anexos || [], value]}
                                            },
                                        }
                                    }];
                                    console.log(pageProps.formGroups.find(fg => fg.title === "Anexos"))
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
                    keyId: pageProps.keyId,
                    data: pageProps.model.Items || null,
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
                                    let fieldGroup = pageProps.formGroups.find(fg => fg.title === "Artigos") as FormGroupProps<T, Item>;
                                    if (!!fieldGroup.listProps) fieldGroup.listProps.data = [...fieldGroup.listProps.data || [], {} as Item]; //model,
                                    console.log(pageProps.formGroups.find(fg => fg.title === "Artigos"))
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
        return newValue;
    }, false);
    useEffect(() => {
        !loadedFormGroups && setLoadedFormGroups(true);
    }, [loadedFormGroups, setLoadedFormGroups]);
    return (
        <Form<T, D> 
            {...contentProps}
            key={pageProps.keyId}
        />
    );
}