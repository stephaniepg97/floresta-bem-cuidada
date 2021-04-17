import { Page } from '../page/Page';
import { ItemList } from '../item-list/ItemList';
import { Item } from "../item/Item";
import { Search } from "../search/Search"
import { Loading } from '../Loading';
import { Model } from '../../../models/Model';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ListPropsWithDetails } from "../../../types/ListPropsWithDetails";
import { ListContentProps } from '../../../types/ListContentProps';
import { Reducer, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import "./List.scss";
import { FormState } from '../../../types/FormProps';

export const List = <T extends Model, D1 extends Model = {}, D2 extends Model = {}, T1 extends Model = T>({searchForm, ...props}: ListPropsWithDetails<T, D1, D2, T1> & FormState<T1> & RouteComponentProps) => {
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
                setData(result?.response?.Data || []);
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

export const ListContent = <T extends Model, D1 extends Model, D2 extends Model, T1 extends Model = T> ({data, ...props}: Omit<ListContentProps<T, D1, D2, T1>, 'searchForm'> & FormState<T1>) => {
    const Items = ({ model, index }: {
        model: T;
        index: number;
    }) => {
        const item = useRef<T>(model);
        return (
            <ItemList<T, D1, D2, T1> 
                {...props}
                yModel={item}
                index={index}
            />
        );
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
                        index={index}
                    />
                ))
                : <small className="sem-resultados">Sem resultados...</small>
            }
        </div>
    );
}