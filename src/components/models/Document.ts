import { Item } from "./Item";
import { Model } from "./Model"

export interface _Document extends Model {
    Documento?: string;
    Descricao?:string;
    Nome?:string;
    TotalMerc?:number;
    Items?:Array<Item>;
    NumDoc?:number;
    TipoDoc?:string;
    Serie?:string;
    DataVenc?:Date;
    NomeForn?:string;
    Fornecedor?:string;
    DescForn?:number;
    DescFinanc?:number;
    Data?:string;
    Anexos?:Array<string>;
}