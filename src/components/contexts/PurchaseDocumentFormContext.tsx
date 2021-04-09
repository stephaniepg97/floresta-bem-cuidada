import { createContext, PropsWithChildren } from "react";
import { useFormProps } from "../hooks/FormProps";
import { Item } from "../models/Item";
import { PurchaseDocument } from "../models/PurchaseDocument";
import { FormContextProps } from "../types/FormContextProps";

const PurchaseDocumentFormContext = createContext<FormContextProps<PurchaseDocument, Item>>({} as FormContextProps<PurchaseDocument, Item>);
export const PurchaseDocumentFormContextProvider = ({ value, children }: PropsWithChildren<{ value: Omit<FormContextProps<PurchaseDocument, Item>, 'formGroups' | 'setFormGroups'> }>) => {
    const [formGroups, setFormGroups] = useFormProps(value); 
    return <PurchaseDocumentFormContext.Provider {...{value: { ...value, formGroups, setFormGroups } as FormContextProps<PurchaseDocument, Item>, children}} />
}
export const PurchaseDocumentFormContextConsumer = PurchaseDocumentFormContext.Consumer;