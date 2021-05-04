import { SearchType } from "./Search";

export interface SearchItems extends SearchType {
    allFamilias?: string;
    allFornecedores?: string;
    artigo?: string;
    familia?: string;
    fornecedor?: string;
    nomeArtigo?: string;
    nomeFamilia?: string;
    nomeFornecedor?: string;
}