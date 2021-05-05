import { SearchType } from "./Search";

export interface SearchConstruction extends SearchType {
    armazemObra?: string;
    codigo?: string;
    descricao?: string;
    entidadeA?: string;
    estado?: string;
    nomeArmazemObra?: string;
    nomeEstado?: string;
    allArmazensObra?: string;
    allEstados?: string;
}