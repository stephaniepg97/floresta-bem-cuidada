import { Reducer, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Page } from '../page/Page';
import { ItemList } from '../item-list/ItemList';
import { Item } from "../item/Item";
import { Search } from "../search/Search"
import { Loading } from '../Loading';
import { Model } from '../../../models/Model';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ListContentProps } from '../../../types/ListContentProps';
import { AppContext } from '../../../contexts/AppContext';
import { ItemListWithDetails } from '../item-list/ItemListWithDetails'; 
import { DetailProps } from '../../../types/DetailProps';
import "./List.scss";

export const List = <T extends Model, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T>({searchForm, ...props}: Omit<ListContentProps<T, D1, D2, T1>, 'setButtons' | 'data'> & RouteComponentProps) => {
    const { fetchApi, token, setToken } = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [data, setData] = useReducer<Reducer<Array<T> | null, Array<T> | null>>((_, newValue) => {
        !!newValue && showLoading && setShowLoading(false);
        return newValue;
    }, props.fetchApiOptions ? null : []);
    useEffect(() => {
        if (!data && showLoading && !!props.fetchApiOptions) {
            console.log(props.fetchApiOptions.route)
            fetchApi(props.fetchApiOptions).then((result) => {
                if (result?.error?.status === 401) setToken(null) //Unauthorized
                else setData(result?.response.Data || []);
                return () => {
                    result = null;
                    
                };
            });
        }
    }, [data, showLoading, props.fetchApiOptions, fetchApi, setToken, token]);
    return (
        <Page {...props}
            key={props.keyId}
            Content={({setButtons}) => (
                <>
                    <Loading isOpen={showLoading} />
                    <Search<T>
                        {...searchForm}
                        key={`${props.keyId}`}
                    />
                    <ListContent<T, D1, D2, T1> {...props} data={data} setButtons={setButtons} />
                </>
            )}
        />
    );
}

export const ListContent = <T extends Model, D1 extends Model, D2 extends Model = {}, T1 extends Model = T> ({data, ...props}: Omit<ListContentProps<T, D1, D2, T1>, 'searchForm'>) => {
    const Items = ({ model, position }: {
        model: T;
        position: number;
    }) => { 
        const item = useRef<T>(model);
        return !!props.details ? (
            <ItemListWithDetails<T, D1, D2, T1> 
                {...props}
                details={props.details as DetailProps<T, D1, D2>}
                xModel={item}
                position={position}
            />
        ) : <ItemList<T, T1> 
                {...props}
                onClick={props.onClick as (row: T) => void}
                xModel={item}
                position={position}
        />;
    }
    return (
        <div key={props.keyId}>
            <Item<T, T1>
                {...props}
                key={`${props.keyId}-item`}
                itemProps={{color: "light"}}
                colProps={{className: "ion-text-center col-title" }}
                Children={(col) => <h6>{col.label}</h6>} 
            />
            {data && data.length
                ? data.map((model, index) => (
                    <Items 
                        model={model}
                        key={`${props.keyId}-${index}`}
                        position={index}
                    />
                ))
                : <small className="sem-resultados">Sem resultados...</small>
            }
        </div>
    );
}
