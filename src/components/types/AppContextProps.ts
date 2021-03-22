import { ResultFetchApi } from "./ResultFetchApi"
import { OptionsFetchApi } from "./OptionsFetchApi"
import { Employee } from "../models/Employee"
import { ComponentProps } from "react"
import { IonReactRouter } from "@ionic/react-router"

export type AppContextProps = ComponentProps<typeof IonReactRouter> & {
    fetchApi: (O : OptionsFetchApi) => Promise<ResultFetchApi>
    token: string | null;
    logout: () => void;
    employee: Employee | null;
}