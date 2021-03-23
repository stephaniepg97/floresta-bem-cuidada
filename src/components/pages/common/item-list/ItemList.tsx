import React, { useState, useEffect, useCallback, useRef, useReducer, Reducer } from 'react';
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

import { ListProps } from "../../../types/ListProps";
import { ColumnProps } from "../../../types/ColumnProps";

import { Model } from "../../../models/Model"
import { ButtonProps } from '../../../types/ButtonProps';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { Input } from '../input/Input';

export const ItemList = <T extends Model, D1 extends Model, D2 extends Model> ({ 
    details,
    model,
    getModel,
    setButtons,
    selected,
    bottomButtons,
    ...props
} : ListProps<T, D1, D2> & RouteComponentProps & {
    model: T;
    selected: React.MutableRefObject<Array<T>>;
    setButtons?: (value: Array<ButtonProps> | undefined) => void;
}) => {
    const modelRef = useRef<T>(model);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [data, setData] = useReducer<Reducer<Array<D1> | undefined, Array<D1> | undefined>>((oldValue, newValue) => {
        if (!!newValue) {
            let _model: T | null = getModel ? getModel(modelRef.current, newValue) : null;
            if (_model && modelRef.current !== _model) modelRef.current = _model;
            //console.log("hide loading DETAILS ITEM ");
            showLoading && setShowLoading(false);
        }
        return newValue;
    }, !details || !details?.fetchApiOptions ? [] : details?.data);
    const [showDetails, setShowDetails] = useReducer<Reducer<boolean, boolean>>((oldValue, newValue) => {
       //!!newValue && console.log("show loading DETAILS ITEM ");
        !!newValue && !showLoading && !data && setShowLoading(true);
        return newValue; 
    }, false);
    const setEndButtons = useCallback<(titles: Array<string>, visible: boolean) => void>((titles, visible) => {
        //console.log(bottomButtons)
        return setButtons && bottomButtons && setButtons(bottomButtons.map<ButtonProps>(buttonProps => buttonProps?.button?.title && titles.includes(buttonProps.button.title) ? {...buttonProps, visible: visible} : buttonProps))
    }, [setButtons, bottomButtons]);

    useEffect(() => {
        if (!showDetails || !!data) return;
        if (!data && details && details?.fetchApiOptions) {
            //console.log(props.fetchApiOptions && props.fetchApiOptions.route)
            setData([{} as D1, {} as D1])
            //props.fetchApi(details.fetchApiOptions(model)).then(result => setData(result.response || []));
        }
    }, [
        data, 
        props, 
        details, 
        showDetails, 
        model,
    ]);

    return (
        <>
            <Loading isOpen={showLoading} />
            <IonList className="main-list">
                <Item<T>
                    fields={props.fields}
                    itemProps={{className: "ion-list-item", detail: true, detailIcon: showDetails ? chevronDown: chevronForward}} 
                    Children={(col) => 
                        <ItemChild<T> 
                            model={modelRef.current} 
                            modelRef={modelRef} 
                            selected={selected} 
                            setEndButtons={setEndButtons} 
                            setShowDetails={setShowDetails} 
                            showDetails={showDetails}
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
                            ? data.map((row, indexR) => (
                                <Item<D1>
                                    key={indexR}
                                    fields={details.columns}
                                    itemProps={{className: "ion-detail-item ion-margin-top", detail: false, color: 'light'}} 
                                    Children={(col) => <ItemChild<D1> model={row} {...col} /> }
                                />
                            )) 
                            : <small className="sem-resultados">Sem resultados...</small>
                        }
                    </>
                }
            </IonList>
        </>
    );
}

const ItemChild = <T extends Model> ({
    checkbox, 
    size, 
    inputProps, 
    Field, 
    modelRef, 
    model,
    showDetails, 
    setShowDetails, 
    selected,
    setEndButtons,
    xfield,
    ...props 
}: ColumnProps<T> & {
    model: T;
    selected?: React.MutableRefObject<Array<T>>;
    modelRef?: React.MutableRefObject<T>;
    setEndButtons?: (titles: Array<string>, visible: boolean) => void;
    showDetails?: boolean; 
    setShowDetails?: (value: boolean) => void 
}) => (
    <IonItem lines="none" color="transparent" {...!!inputProps?.readonly && !checkbox && {
        onClick: () => setShowDetails && setShowDetails(!showDetails)
    }}>
        <>
            {checkbox && modelRef && selected && setEndButtons ? 
                <IonCheckbox  
                    checked={selected.current.includes(modelRef.current)} 
                    onIonChange={() => {
                        //let last = selected.current.length === 0;
                        if (selected.current.includes(modelRef.current)) selected.current.splice(selected.current.indexOf(modelRef.current), 1);
                        else selected.current.push(modelRef.current);
                        //console.log(last || selected.current.length !== 0)
                        //setEndButtons(["create", "reset"], last || selected.current.length !== 0); 
                    }}
                /> : 
                <Input<T>
                    {...props}
                    model={model}
                    {...inputProps && modelRef && setEndButtons ? {
                        inputProps: {...inputProps,
                            onIonChange: (event) => {
                                if (!inputProps?.name) return;
                                modelRef.current = {...modelRef.current, [inputProps.name]: event.detail.value}
                                //setEndButtons(["save"], true);
                            },
                        }
                    } : {
                        Field: Field ? Field : () => <></>,
                        xfield: xfield || null
                    }}
                />
            }
        </> 
    </IonItem>  
);