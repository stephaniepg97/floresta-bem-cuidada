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
import { OptionsFetchApi } from '../../../types/OptionsFetchApi';
import "./List.scss";
import { SearchType } from '../../../models/Search';

export const List = <T extends Model, SearchT extends SearchType, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T>({searchForm, ...props}: Omit<ListContentProps<T, SearchT, D1, D2, T1>, 'setButtons' | 'data'> & RouteComponentProps) => {
    const { fetchApi, setToken } = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [showSearch, setShowSearch] = useState(false);
    const [fetchApiOptions, setFetchApiOptions] = useState<OptionsFetchApi | null | undefined>(props.fetchApiOptions);
    const [data, setData] = useReducer<Reducer<Array<T> | null, Array<T> | null>>((_, newValue) => {
        !!newValue && showLoading && setShowLoading(false);
        return newValue;
    }, null);
    useEffect(() => {
        if (!!props.fetchApiOptions) {
            if (props.fetchApiOptions !== fetchApiOptions) setFetchApiOptions(props.fetchApiOptions)
            else fetchApi(props.fetchApiOptions).then((result) => {
                setData(result?.response?.Data || []);
                if (result?.error?.status === 401) setToken(null) //Unauthorized
                return () => {
                    result = null;
                };
            });
        }
    }, [props.fetchApiOptions, fetchApiOptions, fetchApi, setToken, setData]);
    return (
        <Page {...props}
            key={props.keyId}
            Content={({setButtons}) => (
                <>
                    <Loading isOpen={showLoading} />
                    <Search<SearchT>
                        {...{showSearch, setShowSearch}}
                        {...searchForm}
                        key={`${props.keyId}`}
                    />
                    <ListContent<T, SearchT, D1, D2, T1> {...props} data={data} setButtons={setButtons} />
                </>
            )}
        />
    );
}

export const ListContent = <T extends Model, SearchT extends SearchType, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T> ({data, ...props}: Omit<ListContentProps<T, SearchT, D1, D2, T1>, 'searchForm'>) => {
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
            {!!data ? data.map((model, index) => (
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
