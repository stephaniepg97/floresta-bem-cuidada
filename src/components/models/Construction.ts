import { Model } from "./Model"

export interface Construction extends Model {
    Codigo?: string;
    Descricao?: string;
    EntidadeA?:string;
    Estado?:string;
    NomeEstado?:string;
    ArmazemObra?:string;
    NomeArmazemObra?:string;
}