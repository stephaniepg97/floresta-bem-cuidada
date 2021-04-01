import React from "react";
import { PurchaseDocument } from "../models/PurchaseDocument";
import { FormContextProps } from "../types/FormContextProps";

export const PurchaseDocumentFormContext = React.createContext({} as FormContextProps<PurchaseDocument>);