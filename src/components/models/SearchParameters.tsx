import { SearchType } from "./Search";

export interface SearchParameters<T extends SearchType> {
    Nome?: keyof T;
    ValorFixo?: string;
}