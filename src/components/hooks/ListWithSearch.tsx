import { MutableRefObject, Reducer, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { SearchDocument } from "../models/SearchDocument";
import { value } from "../../helpers/Helper";
import { SearchParameters } from "../models/SearchParameters";
import { SearchParametersList } from "../../config.json";
import { OptionsFetchApi } from "../types/OptionsFetchApi";
import { SearchType } from "../models/Search";
import { ListWithSearchProps, SearchProps } from "../types/SearchProps";
import { ResultFetchApi } from "../types/ResultFetchApi";

export const useListWithSearch = <TSearch extends SearchType> ({listId, history, model, showDialog}: ListWithSearchProps<TSearch> & {showDialog: (result: ResultFetchApi) => void}) => {
    const {token, fetchApi, setToken} = useContext(AppContext);
    const [fetchApiOptions, setFetchApiOptions] = useState<OptionsFetchApi | null>(null);
    const [searchModel, setSearchModel] = useReducer<Reducer<MutableRefObject<TSearch>, MutableRefObject<TSearch>>>((_, newValue) => {
        setFetchApiOptions({route: `Plataforma/Listas/CarregaLista/adhoc?listId=${listId}&listParameters=${Object.keys(newValue.current).sort((key1, key2) => key1 < key2 ? -1 : 1).map((key) => value<SearchDocument>(key as keyof SearchDocument, newValue.current)).join(",")}`})
        return newValue;
    }, model);
    const clean = useCallback(() => fetchApi({route: `Plataforma/Listas/CarregaLista/adhoc?listId=${SearchParametersList}&listParameters=${listId}`})
        .then((result) => {
            if (!!result && !result?.status) showDialog(result);
            if (result?.statusCode === 401) setToken(null) //Unauthorized
            else if (result?.status) {
                searchModel.current = {
                    ...(result?.response?.Data as Array<SearchParameters<TSearch>>)?.map(item => {
                        return { [String(item.Nome)]: item.ValorFixo };
                    }).reduce((item, acc) => acc = { ...acc, ...item })
                } as unknown as TSearch; 
                setSearchModel(searchModel);
            }
        }), [searchModel, fetchApi, setToken, listId, setSearchModel, showDialog]);
    useEffect(() => {
        if (!token) history.push("/login")
        else if (!fetchApiOptions) clean();
        console.log(fetchApiOptions)
    }, [history, token, clean, fetchApiOptions, searchModel])
    return {clean, searchModel, setSearchModel, fetchApiOptions, setFetchApiOptions} as SearchProps<TSearch>;
}