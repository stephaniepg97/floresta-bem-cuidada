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
import { FormState } from '../../../types/FormProps';

export const ItemList = <T extends Model, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T> ({ 
    details,
    yModel,
    getModel,
    setButtons,
    buttons,
    model,
    index,
    ...props
} : Omit<ListPropsWithDetails<T, D1, D2, T1>, 'searchForm'> & RouteComponentProps & FormState<T1> & {
    setButtons?: (value: Array<ButtonProps> | undefined) => void;
    buttons?: Array<ButtonProps>;
    yModel: MutableRefObject<T>;
    index: number;
}) => {
    const { fetchApi, setToken, token } = useContext(AppContext);
    const selected = useRef<Array<T>>([]);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [data, setData] = useReducer<Reducer<Array<D1> | undefined, Array<D1> | undefined>>((_, newValue) => {
        if (!!newValue) {
            let _model: T | null = getModel ? getModel(yModel.current, newValue) : null;
            if (_model && yModel.current !== _model) yModel.current = _model;
            console.log(yModel.current)
            showLoading && setShowLoading(false);
        }
        return newValue;
    }, !details || !details?.fetchApiOptions ? [] : details?.data);
    const [showDetails, setShowDetails] = useReducer<Reducer<boolean, boolean>>((_, newValue) => {
        !!newValue && !showLoading && !data && setShowLoading(true);
        return newValue; 
    }, false);
    const setEndButtons = useCallback<(titles: Array<string>, visible: boolean) => void>((titles, visible) => setButtons && !!buttons && setButtons(buttons.map<ButtonProps>(buttonProps => buttonProps?.button?.title && titles.includes(buttonProps.button.title) ? {...buttonProps, visible: visible} : buttonProps)), [setButtons, buttons]);
    const ItemChild = <I extends Model = T | D1, I1 extends Model = T | T1> ({
        checkbox, 
        size, 
        inputProps, 
        Field, 
        xfield,
        xModel,
        model,
        index,
        ...props 
    }: ColumnProps<I, I1> & FormState<I1> & {
        index: number;
    }) => (
        <IonItem lines="none" color="transparent" {...!!inputProps?.readonly && !checkbox && {
            onClick: () => setShowDetails && setShowDetails(!showDetails)
        }}>
            <>
                {(!xModel || (JSON.stringify(xModel.current) === JSON.stringify(yModel.current))) && checkbox ? 
                    <IonCheckbox  
                        checked={selected.current.includes(yModel.current)} 
                        onIonChange={() => {
                            let last = selected.current.length === 0;
                            if (selected.current.includes(yModel.current)) selected.current.splice(selected.current.indexOf(yModel.current), 1);
                            else selected.current.push(yModel.current);
                            setEndButtons(["create", "reset"], last || selected.current.length !== 0); 
                        }}
                    /> : 
                    <Input<I, I1>
                        {...props}
                        {...inputProps ? {
                            inputProps: {
                                ...inputProps,
                                onIonChange: () => setEndButtons(["save"], true),
                                className: "ion-text-center"
                            }
                        } : {
                            Field: Field as React.ComponentType<{
                                value?: object | undefined;
                            }>,
                            xfield: xfield || null
                        }}
                        model={model}
                        xModel={xModel}
                        index={index}
                    />
                }
            </> 
        </IonItem>  
    );
    const DetailItem = ({model, fields, index}: {
        model: D1, 
        fields: ColumnProps<D1, T>[],
        index: number
    }) => {
        const item = useRef<D1>(model);
        return (
            <Item<D1, T>
                fields={fields}
                itemProps={{className: "ion-detail-item ion-margin-top", detail: false, color: 'light'}} 
                Children={(col) => <ItemChild<D1, T> {...{...col, xModel: item}} model={yModel} index={index} /> }
            />
        );
    }
    useEffect(() => {
        if (!showDetails || !!data) return;
        if (!data && details && details?.fetchApiOptions) {
            fetchApi(details.fetchApiOptions(yModel.current)).then((result) => {
                setData(result.response.Data || []);
            });
        }
    }, [
        setToken,
        token,
        data, 
        props, 
        details, 
        showDetails, 
        model,
        fetchApi,
        yModel
    ]);
    return (
        <>
            <Loading isOpen={showLoading} />
            <IonList className="main-list">
                <Item<T, T1>
                    fields={props.fields}
                    itemProps={{className: "ion-list-item", detail: true, detailIcon: showDetails ? chevronDown: chevronForward}} 
                    Children={(col) => 
                        <ItemChild<T, T1>
                            {...{...col, xModel: yModel}}
                            model={model}
                            index={index}
                        />
                    }
                />
                {details && data && showDetails &&
                    <>
                        <IonLabel className="ion-align-self-end">
                            <small><b>{data.length}</b><span>{data.length === 1 ? " Item" : " Itens"}</span></small>
                        </IonLabel>
                        <Item<D1, T>
                            fields={details.columns}
                            itemProps={{color: "light"}}
                            colProps={{className: "ion-text-center" }}
                            Children={(col) => <h6>{col.label}</h6>} 
                        />
                        {data.length
                            ? data.map((row, index) => <DetailItem model={row} key={index} fields={details.columns} index={index} />) 
                            : <small className="sem-resultados">Sem resultados...</small>
                        }
                    </>
                }
            </IonList>
        </>
    );
}