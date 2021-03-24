import React from 'react';
import {  arrowUp } from 'ionicons/icons';

import { Page } from '../page/Page';
import { ItemList } from '../item-list/ItemList';
import { Item } from "../item/Item";
import { FabButton } from "../buttons/FabButton";
import { Search } from "../search/Search"
import { Loading } from '../Loading';

import { Model } from '../../../models/Model';

import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ListProps } from "../../../types/ListProps";
import { InputProps } from '../../../types/InputProps';
import { ListContentProps } from '../../../types/ListContentProps';

import { AppContext } from '../../../contexts/AppContext';

import { useDataAPI } from '../../../hooks/DataAPI';

import "./List.scss";

export const List = <T extends Model, D1 extends Model = any, D2 extends Model = any>(props: ListProps<T, D1, D2> & RouteComponentProps) => {
    const [data, loading] = useDataAPI<T>(props.fetchApiOptions);
    return (
        <Page {...props}
            key={props.keyId}
            Content={({setButtons}) => (
                <>
                    <Loading isOpen={loading} />
                    <Search<T> 
                        {...props} 
                        model={{} as T} 
                        form={[{
                            fields: props.fields.filter(field => !!field.searchFields).map(field => field.searchFields as Array<InputProps<T>>)
                        }]} 
                    />
                    <ListContent {...props} data={data} setButtons={setButtons} />
                </>
            )}
        />
    );
}

export const ListContent = <T extends Model, D1 extends Model, D2 extends Model> ({data, ...props}: ListContentProps<T, D1, D2>) => (
    <div key={props.keyId}>
        <Item<T>
            {...props}
            itemProps={{color: "light"}}
            colProps={{className: "ion-text-center col-title" }}
            Children={(col) => <h6>{col.label}</h6>} 
        />
        
        {data && data.length
            ? <AppContext.Consumer>
                {contextProps => data.map((row, indexR) => (
                    <ItemList<T, D1, D2> 
                        {...contextProps}
                        {...props}
                        key={indexR} 
                        model={row}
                    />
                ))}
            </AppContext.Consumer> 
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
    </div>
);