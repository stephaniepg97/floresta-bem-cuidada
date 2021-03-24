import { Reducer, useEffect, useReducer, useState } from "react";
import { Model } from "../models/Model";
import { OptionsFetchApi } from "../types/OptionsFetchApi";

export const useDataAPI = <T extends Model> (fetchApiOptions?: OptionsFetchApi) => {
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [data, setData] = useReducer<Reducer<Array<T> | null, Array<T> | null>>((_, newValue) => {
        !!newValue && showLoading && setShowLoading(false);
        return newValue;
    }, !fetchApiOptions ? [] : null);
    useEffect(() => {
        if (!data && showLoading && !!fetchApiOptions) {
            console.log(fetchApiOptions.route)
            /*props.fetchApi(props.fetchApiOptions).then(result => {
                console.log(result)
                setData(result.response?.Data || [])
            });*/
            setData([{} as T, {} as T])
        }
    }, [data, showLoading, fetchApiOptions]);
    return [data, showLoading] as [Array<T> | null, boolean];
}