import { Model } from "./Model"

export interface Item extends Model {
    Artigo?: string;
    NomeArtigo?: string;
    Quantidade?: number;
    PrecUnit?: number;
    Documento?: string;
    DataEntrega?:string;
    Desconto?:number;
    TaxaIva?:number;
    FornecedorPrincipal?:string;
    NomeFornecedorPrincipal?:string;
    Familia?:string;
    NomeFamilia?:string;
    ArmazemSugestao?:string;
}   