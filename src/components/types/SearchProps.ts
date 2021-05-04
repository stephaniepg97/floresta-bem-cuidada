import { RouteComponentProps as RCP } from "react-router";
import { SearchType } from "../models/Search";
import { FormState } from "./FormProps";
import { OptionsFetchApi } from "./OptionsFetchApi";
import { RouteComponentProps } from "./RouteComponentProps";

export type ListWithSearchProps<T extends SearchType = {}> = {
    listId: string;
} & Pick<RCP, 'history'> & FormState<T>

export type SearchProps<T extends SearchType = {}> = Pick<RouteComponentProps, 'fetchApiOptions'> & {
    clean: () => Promise<void>;
    searchModel: React.MutableRefObject<T>;
    setSearchModel: React.Dispatch<React.MutableRefObject<T>>;
    setFetchApiOptions: React.Dispatch<React.SetStateAction<OptionsFetchApi | null>>;
    showSearch: boolean;
    setShowSearch: (value: boolean) => void;
}