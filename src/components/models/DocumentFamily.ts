import { Model } from "./Model"

export interface DocumentFamily extends Model {
    TipoDoc?:string;
    Serie?:string;
    Descricao?:string;
    DataInicial?:Date;
    DataFinal?:Date;
}