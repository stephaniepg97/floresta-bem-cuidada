import { Model } from "./Model"

export interface Item extends Model {
    Id?: string;
    Artigo?: string;
    Descricao?: string;
    Quantidade?: number;
    Peso?:number;
    PrecUnit?: number;
    Checked?: boolean;
    Documento?: string;
    DataEntrega?:string
}   