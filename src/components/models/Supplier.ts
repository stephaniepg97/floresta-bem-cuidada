import { Model } from "./Model"

export interface Supplier extends Model {
    Fornecedor?: string;
    Nome?: string;
    Local?: string;
    Morada?: string;
    NumContrib?: string;
    NomePais?: string;
    NomeDistrito?: string;
}