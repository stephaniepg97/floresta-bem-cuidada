import { Page } from '../page/Page';
import { ItemList } from '../item-list/ItemList';
import { Item } from "../item/Item";
import { Search } from "../search/Search"
import { Loading } from '../Loading';
import { Model } from '../../../models/Model';
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { ListPropsWithDetails } from "../../../types/ListPropsWithDetails";
import { ListContentProps } from '../../../types/ListContentProps';
import { useDataAPI } from '../../../hooks/DataAPI';
import { FormGroupProps } from '../../../types/FormProps';
import "./List.scss";

export const List = <T extends Model, D1 extends Model = {}, D2 extends Model = {}>(props: ListPropsWithDetails<T, D1, D2> & RouteComponentProps) => {
    const [data, loading] = useDataAPI<T>(props.fetchApiOptions);
    return (
        <Page {...props}
            key={props.keyId}
            Content={({setButtons}) => (
                <>
                    <Loading isOpen={loading} />
                    <Search<T> 
                        key={`${props.keyId}`}
                        FormContext={props.FormContext}
                        formGroups={props.fields.filter(f => !!f.searchForm).map(f => f.searchForm as FormGroupProps<T>)} 
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
            ? data.map((row, index) => (
                <ItemList<T, D1, D2> 
                    key={`${props.keyId}-${index}`}
                    {...props}
                    row={row}
                />
            ))
            : <small className="sem-resultados">Sem resultados...</small>
        }
    </div>
);