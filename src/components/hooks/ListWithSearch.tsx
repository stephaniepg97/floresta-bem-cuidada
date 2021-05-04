import { MutableRefObject, Reducer, useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { SearchDocument } from "../models/SearchDocument";
import { value } from "../../helpers/Helper";
import { SearchParameters } from "../models/SearchParameters";
import { RouteComponentProps } from "react-router";
import { SearchParametersList } from "../../config.json";
import { OptionsFetchApi } from "../types/OptionsFetchApi";
import { SearchType } from "../models/Search";

export const useListWithSearch = <TSearch extends SearchType> ({listId, history}: {listId: string} & Pick<RouteComponentProps, 'history'>) => {
    const {token, fetchApi, setToken} = useContext(AppContext);
    const [fetchApiOptions, setFetchApiOptions] = useState<OptionsFetchApi | null>(null);
    const [searchModel, setSearchModel] = useReducer<Reducer<MutableRefObject<TSearch>, MutableRefObject<TSearch>>>((_, newValue) => {
        setFetchApiOptions({route: `Plataforma/Listas/CarregaLista/adhoc?listId=${listId}&listParameters=${Object.keys(newValue.current).sort((key1, key2) => key1 < key2 ? -1 : 1).map((key) => value<SearchDocument>(key as keyof SearchDocument, newValue.current)).join(",")}`})
        return newValue;
    }, useRef<TSearch>({} as TSearch));
    const clean = useCallback(() => fetchApi({route: `Plataforma/Listas/CarregaLista/adhoc?listId=${SearchParametersList}&listParameters=${listId}`})
        .then((result) => {
            if (result?.error?.status === 401) setToken(null) //Unauthorized
            else if (!!result?.error?.message) alert(result?.error?.message);
            else {
                searchModel.current = {
                    ...(result?.response?.Data as Array<SearchParameters<TSearch>>)?.map(item => {
                        return { [String(item.Nome)]: item.ValorFixo };
                    }).reduce((item, acc) => acc = { ...acc, ...item })
                } as unknown as TSearch; 
                setSearchModel(searchModel);
            }
        }), [searchModel, fetchApi, setToken, listId, setSearchModel]);
    useEffect(() => {
        if (!token) history.push("/login")
        else if (!fetchApiOptions) clean();
        console.log(fetchApiOptions)
    }, [history, token, clean, fetchApiOptions, searchModel])
    return {clean, searchModel, setSearchModel, fetchApiOptions, setFetchApiOptions};
}