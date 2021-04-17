import { Model } from "./Model"

export interface Supplier extends Model {
    Fornecedor?: string;
    NomeFornecedor?: string;
    Localidade?: string;
    NIF?: string;
    CondPag?: string;
    NomePais?: string;
    NomeDistrito?: string;
    NomeCondPag?: string;
    ModoPag?: string;
    NomeModoPag?: string;
    ModoExp?: string;
    NomeModoExp?: string;
    Moeda?: string;
}