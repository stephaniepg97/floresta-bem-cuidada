import React from "react";
import { _Document } from "../models/Document";
import { FormContextProps } from "../types/FormContextProps";

export const SearchFormContext = React.createContext({} as FormContextProps<_Document>);