import { Item } from "./Item";
import { Model } from "./Model"

export interface _Document<D extends Item = Item> extends Model {
    Documento?: string;
    Descricao?:string;
    Nome?:string;
    Total?:number;
    Items?:Array<D>;
    NumDoc?:number;
    Tipodoc:string;
    Serie:string;
    DataVencimento:string;
    IDObra:string;
    NomeObra?:string;
    NomeEntidade?:string;
    Entidade:string;
    DescEntidade:number;
    DescFinanceiro:number;
    Data:string;
    Anexos?:Array<string>;
    Filial:string;
    TipoEntidade:string;
}