import React from "react";
import { AppContextProps } from "../types/AppContextProps";

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);