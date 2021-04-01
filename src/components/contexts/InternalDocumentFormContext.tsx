import React from "react";
import { InternalDocument } from "../models/InternalDocument";
import { FormContextProps } from "../types/FormContextProps";

export const InternalDocumentFormContext = React.createContext({} as FormContextProps<InternalDocument>);