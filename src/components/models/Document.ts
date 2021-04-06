import { Item } from "./Item";
import { Model } from "./Model"

export interface _Document<D extends Item = Item> extends Model {
    Documento?: string;
    Descricao?:string;
    Nome?:string;
    Total?:number;
    Items?:Array<D>;
    NumDoc?:number;
    TipoDoc?:string;
    Serie?:string;
    DataVenc?:string;
    Obra?:string;
    NomeObra?:string;
    NomeFornecedor?:string;
    Fornecedor?:string;
    DescForn?:number;
    DescFinanc?:number;
    Data?:string;
    Anexos?:Array<string>;
}