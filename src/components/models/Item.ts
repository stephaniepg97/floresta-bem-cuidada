import { Model } from "./Model"

export interface Item extends Model {
    Id?: string;
    Artigo?: number;
    Descricao?: string;
    Quantidade?: number;
    Peso?:number;
    PrecUnit?: number;
    Checked?: boolean;
    Documento?: string;
    CDU_ArtigoTransporte?:boolean
}   