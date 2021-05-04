import { SearchType } from "./Search";

export interface SearchSupplier extends SearchType {
    allCondPag?:string;
    allDistritos?:string;
    allLocalidades?:string;
    allModosExp?:string;
    allModosPag?:string;
    allNifs?:string;
    allPaises?:string;
    condPag?:string;
    distrito?:string;
    localidade?:string;
    modoExp?:string;
    modoPag?:string;
    nif?:string;
    nomeCondPag?:string;
    nomeDistrito?:string;
    nomeModoExp?:string;
    nomeModoPag?:string;
    nomePais?:string;
    pais?:string;
}