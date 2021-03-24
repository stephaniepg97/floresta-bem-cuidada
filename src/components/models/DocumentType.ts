import { Model } from "./Model"

export interface DocumentType extends Model {
    TipoDoc?:string;
    Descricao?:string;
}