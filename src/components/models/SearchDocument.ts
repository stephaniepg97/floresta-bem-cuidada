import { Model } from "./Model";
import { SearchType } from "./Search";

export interface SearchDocument extends SearchType {
    dataFim?:string;
    dataIni?:string;
    entidade?:string;
    nomeEntidade?:string;
    nomeObra?:string;
    numDocFim?:number;
    numDocIni?:number;
    obra?:string;
    serie?:string;
    tipoDoc?:string;
}