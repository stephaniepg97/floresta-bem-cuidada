import { createContext, PropsWithChildren } from "react";
import { RouteComponentProps } from "react-router";
import { useFormGroups } from "../hooks/FormGroups";
import { Item } from "../models/Item";
import { PurchaseDocument } from "../models/PurchaseDocument";
import { FormContextProps } from "../types/FormContextProps";

const PurchaseDocumentFormContext = createContext({} as FormContextProps<PurchaseDocument, Item>);
export const PurchaseDocumentFormContextProvider = ({ value, children }: PropsWithChildren<{ value: Omit<FormContextProps<PurchaseDocument, Item>, 'reloadForm' | 'formGroups'> & Pick<RouteComponentProps, 'history'> }>) => {
    return <PurchaseDocumentFormContext.Provider {...{value: { ...value, ...useFormGroups(value) } as FormContextProps<PurchaseDocument, Item>, children}} />
}
export const PurchaseDocumentFormContextConsumer = PurchaseDocumentFormContext.Consumer;