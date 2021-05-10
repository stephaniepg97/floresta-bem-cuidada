import { SearchType } from "./Search";

export interface SearchDocumentType extends SearchType {
    codigo?: string;
    descricao?: string;
}