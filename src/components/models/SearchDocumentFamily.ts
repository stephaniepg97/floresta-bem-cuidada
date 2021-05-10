import { SearchType } from "./Search";

export interface SearchDocumentFamily extends SearchType {
    tipo?: string;
    nomeTipo?: string;
    serie?: string;
    nomeSerie?: string;
}