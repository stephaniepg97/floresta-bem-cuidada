import { createContext, PropsWithChildren } from "react";
import { RouteComponentProps } from "react-router";
import { useFormGroups } from "../hooks/FormGroups";
import { Item } from "../models/Item";
import { PurchaseDocument } from "../models/PurchaseDocument";
import { FormContextProps } from "../types/FormContextProps";
import { PurchaseDocTypeList, PurchaseDocFamilyList } from "../../config.json"

const PurchaseDocumentFormContext = createContext({} as FormContextProps<PurchaseDocument, Item>);
export const PurchaseDocumentFormContextProvider = ({ value, children }: PropsWithChildren<{ value: Omit<FormContextProps<PurchaseDocument, Item>, 'reloadForm' | 'formGroups'> & Pick<RouteComponentProps, 'history'> }>) => {
    return <PurchaseDocumentFormContext.Provider {...{value: { ...value, ...useFormGroups({...value, listIdDocFamilies: PurchaseDocFamilyList, listIdDocTypes: PurchaseDocTypeList }) } as FormContextProps<PurchaseDocument, Item>, children}} />
}
export const PurchaseDocumentFormContextConsumer = PurchaseDocumentFormContext.Consumer;