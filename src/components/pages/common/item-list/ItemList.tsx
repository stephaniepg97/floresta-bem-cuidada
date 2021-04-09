import React, { useState, useEffect, useRef, useReducer, Reducer, useCallback, useContext, MutableRefObject } from 'react';
import { 
    IonLabel,
    IonList,
    IonCheckbox,
    IonItem,
} from '@ionic/react';
import { chevronForward, chevronDown } from 'ionicons/icons';

import { Item } from "../item/Item";
import { Loading } from "../Loading"

import "./ItemList.scss";

import { ListPropsWithDetails } from "../../../types/ListPropsWithDetails";
import { ColumnProps } from "../../../types/ColumnProps";

import { Model } from "../../../models/Model"
import { ButtonProps } from '../../../types/ButtonProps';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { Input } from '../inputs/Input';
import { AppContext } from '../../../contexts/AppContext'; 

export const ItemList = <T extends Model, D1 extends Model, D2 extends Model> ({ 
    details,
    row,
    getModel,
    setButtons,
    buttons,
    ...props
} : Omit<ListPropsWithDetails<T, D1, D2>, 'searchForm'> & RouteComponentProps & {
    row: T;
    setButtons?: (value: Array<ButtonProps> | undefined) => void;
    buttons?: Array<ButtonProps>;
}) => {
    const { fetchApi } = useContext(AppContext);
    const model = useRef<T>(row);
    const selected = useRef<Array<T>>([]);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [data, setData] = useReducer<Reducer<Array<D1> | undefined, Array<D1> | undefined>>((_, newValue) => {
        if (!!newValue) {
            let _model: T | null = getModel ? getModel(model.current, newValue) : null;
            if (_model && model.current !== _model) model.current = _model;
            console.log(model.current)
            showLoading && setShowLoading(false);
        }
        return newValue;
    }, !details || !details?.fetchApiOptions ? [] : details?.data);
    const [showDetails, setShowDetails] = useReducer<Reducer<boolean, boolean>>((_, newValue) => {
        !!newValue && !showLoading && !data && setShowLoading(true);
        return newValue; 
    }, false);
    const setEndButtons = useCallback<(titles: Array<string>, visible: boolean) => void>((titles, visible) => setButtons && !!buttons && setButtons(buttons.map<ButtonProps>(buttonProps => buttonProps?.button?.title && titles.includes(buttonProps.button.title) ? {...buttonProps, visible: visible} : buttonProps)), [setButtons, buttons]);
    const ItemChild = <I extends Model = T | D1> ({
        checkbox, 
        size, 
        inputProps, 
        Field, 
        modelOrItem,
        xfield,
        ...props 
    }: (ColumnProps<I>) & {
        modelOrItem: MutableRefObject<I>;
    }) => {
        return (
            <IonItem lines="none" color="transparent" {...!!inputProps?.readonly && !checkbox && {
                onClick: () => setShowDetails && setShowDetails(!showDetails)
            }}>
                <>
                    {(JSON.stringify(modelOrItem) === JSON.stringify(model.current)) && checkbox ? 
                        <IonCheckbox  
                            checked={selected.current.includes(model.current)} 
                            onIonChange={() => {
                                let last = selected.current.length === 0;
                                if (selected.current.includes(model.current)) selected.current.splice(selected.current.indexOf(model.current), 1);
                                else selected.current.push(model.current);
                                setEndButtons(["create", "reset"], last || selected.current.length !== 0); 
                            }}
                        /> : 
                        <Input<I>
                            {...props}
                            {...inputProps ? {
                                inputProps: {...inputProps,
                                    onIonChange: (event) => {
                                        if (!inputProps?.name) return;
                                        modelOrItem = {...modelOrItem, [inputProps.name]: event.detail.value}
                                        setEndButtons(["save"], true);
                                    },
                                    className: "ion-text-center"
                                }
                            } : {
                                Field: Field as React.ComponentType<{
                                    value?: object | undefined;
                                }>,
                                xfield: xfield || null
                            }}
                            model={modelOrItem}
                        />
                    }
                </> 
            </IonItem>  
        );
    };
    const DetailItem = ({model, fields}: {
        model: D1, 
        fields: ColumnProps<D1>[]
    }) => {
        const item = useRef<D1>(model);
        return (
            <Item<D1>
                fields={fields}
                itemProps={{className: "ion-detail-item ion-margin-top", detail: false, color: 'light'}} 
                Children={(col) => <ItemChild modelOrItem={item} {...col} /> }
            />
        );
    }
    useEffect(() => {
        if (!showDetails || !!data) return;
        if (!data && details && details?.fetchApiOptions) {
            fetchApi(details.fetchApiOptions(model.current)).then(result => setData(result.response.Data || []));
        }
    }, [
        data, 
        props, 
        details, 
        showDetails, 
        model,
        fetchApi
    ]);
    return (
        <>
            <Loading isOpen={showLoading} />
            <IonList className="main-list">
                <Item<T>
                    fields={props.fields}
                    itemProps={{className: "ion-list-item", detail: true, detailIcon: showDetails ? chevronDown: chevronForward}} 
                    Children={(col) => 
                        <ItemChild
                            modelOrItem={model} 
                            {...col} 
                        />
                    }
                />
                {details && data && showDetails &&
                    <>
                        <IonLabel className="ion-align-self-end">
                            <small><b>{data.length}</b><span>{data.length === 1 ? " Item" : " Itens"}</span></small>
                        </IonLabel>
                        <Item<D1>
                            fields={details.columns}
                            itemProps={{color: "light"}}
                            colProps={{className: "ion-text-center" }}
                            Children={(col) => <h6>{col.label}</h6>} 
                        />
                        {data.length
                            ? data.map((row, index) => <DetailItem model={row} key={index} fields={details.columns} />) 
                            : <small className="sem-resultados">Sem resultados...</small>
                        }
                    </>
                }
            </IonList>
        </>
    );
}