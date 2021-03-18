import { Model } from "./Model"

export interface Employee extends Model {
    Codigo?: string;
    Nome?: string;
    CDU_PasswordAppWeb?: string;
    CDU_AcessoAppWeb?: boolean;
    CDU_ModuloCustosTransporte?: boolean;
    CDU_ModuloHorasExtras?: boolean;
    Email?: string;
}