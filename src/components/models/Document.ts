import { Item } from "./Item";
import { Model } from "./Model"

export interface _Document extends Model {
    Documento?: string;
    Descricao?:string;
    Nome?:string;
    TotalMerc?:number;
    Items?:Array<Item>;
}