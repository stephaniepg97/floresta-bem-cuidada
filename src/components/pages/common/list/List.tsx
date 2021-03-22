import React, { useState, useEffect, useRef, useReducer, Reducer } from 'react';
import { funnel, arrowUp } from 'ionicons/icons';

import { Page } from '../page/Page';
import { ItemList } from '../item-list/ItemList';
import { Item } from "../item/Item";
import { Button } from "../buttons/Button";
import { FabButton } from "../buttons/FabButton";
import { Search } from "../search/Search"
import { Loading } from '../Loading';

import { Model } from '../../../models/Model';

import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ListProps } from "../../../types/ListProps";
import { InputProps } from '../../../types/InputProps';
import { ButtonProps } from '../../../types/ButtonProps';

import "./List.scss";
import { AppContextProps } from '../../../types/AppContextProps';

export const List = <T extends Model, D1 extends Model, D2 extends Model>({bottomButtons, ...props}: ListProps<T, D1, D2> & RouteComponentProps & AppContextProps) => {
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [data, setData] = useReducer<Reducer<Array<T> | null, Array<T> | null>>((oldValue, newValue) => {
        //!!newValue && console.log("hide loading")
        !!newValue && showLoading && setShowLoading(false);
        return newValue;
    }, !props.fetchApiOptions ? [] : null);
    const bottomButtonsRef = useRef<Array<ButtonProps> | undefined>(bottomButtons);

    useEffect(() => {
        if (!data && showLoading && !!props.fetchApiOptions) {
            console.log(props.fetchApiOptions.route)
            props.fetchApi(props.fetchApiOptions).then(result => {
                console.log(result)
                setData(result.response?.Data || [])
            });
            //setData([{} as T, {} as T])
        }
    }, [data, showLoading, props]);

    return (
        <Page 
            {...props} 
            bottomButtons={bottomButtonsRef}
            Content={({setButtons}) => (
                <>
                    <Loading isOpen={showLoading} />
                    <ListContent {...props} setButtons={setButtons} bottomButtons={bottomButtonsRef.current} data={data} />
                </>
            )}
        />
    );
}

export const ListContent = <T extends Model, D1 extends Model, D2 extends Model> ({setButtons, bottomButtons, data, ...props}: ListProps<T, D1, D2> & RouteComponentProps & AppContextProps & {
    setButtons?: (value: Array<ButtonProps> | undefined) => void; 
    data: Array<T> | null;
}) => {
    const selectedRef = useRef<Array<T>>([]);
    return (
        <>
            <Search<T> 
                {...props} 
                model={{} as T} 
                form={[{
                    fields: props.fields.map<InputProps<T>>(field => field)
                }]} 
            />
            <Button
                icon={{
                    icon: funnel
                }}
                button={{
                    slot: "end",
                    onClick: () => { }
                }}
                visible
            />
            <Item<T>
                {...props}
                itemProps={{color: "light"}}
                colProps={{className: "ion-text-uppercase ion-text-center" }}
                Children={(col) => <h6>{col.label}</h6>} 
            />
            {data && data.length
                ? data.map((row, indexR) => (
                    <ItemList<T, D1, D2> 
                        {...props}
                        key={indexR} 
                        model={row}
                        setButtons={setButtons}
                        selected={selectedRef}
                        bottomButtons={bottomButtons}
                    />
                )) 
                : <small className="sem-resultados">Sem resultados...</small>
            }
            <FabButton
                fab={{
                    vertical: "bottom",
                    horizontal: "end"
                }}
                icon={{
                    icon: arrowUp
                }}
                button={{
                    color: "white",
                    onClick: () => { } //scroll to Top
                }}
                visible={!!data && !!data.length}
            />
        </>
    );
}