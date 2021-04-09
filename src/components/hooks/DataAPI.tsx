import { Reducer, useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Model } from "../models/Model";
import { OptionsFetchApi } from "../types/OptionsFetchApi";

export const useDataAPI = <T extends Model> (fetchApiOptions?: OptionsFetchApi) => {
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [data, setData] = useReducer<Reducer<Array<T> | null, Array<T> | null>>((_, newValue) => {
        !!newValue && showLoading && setShowLoading(false);
        return newValue;
    }, !fetchApiOptions ? [] : null);
    const { fetchApi } = useContext(AppContext);
    useEffect(() => {
        if (!data && showLoading && !!fetchApiOptions) {
            console.log(fetchApiOptions.route)
            fetchApi(fetchApiOptions).then(result => {
                console.log(result.response)
                setData(result.response?.Data || [])
            });
        }
    }, [data, showLoading, fetchApiOptions, fetchApi]);
    return [data, showLoading] as [Array<T> | null, boolean];
}