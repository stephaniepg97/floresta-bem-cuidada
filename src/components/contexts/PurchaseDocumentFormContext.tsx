import { createContext, PropsWithChildren, useState } from "react";
import { Item } from "../models/Item";
import { PurchaseDocument } from "../models/PurchaseDocument";
import { FormContextProps } from "../types/FormContextProps";
import { FormGroupProps } from "../types/FormProps";

const PurchaseDocumentFormContext = createContext<FormContextProps<PurchaseDocument, Item>>({} as FormContextProps<PurchaseDocument, Item>);
export const PurchaseDocumentFormContextProvider = (props: PropsWithChildren<{ value: Omit<FormContextProps<PurchaseDocument, Item>, 'formGroups' | 'setFormGroups'> }>) => {
    const [formGroups, setFormGroups] = useState<Array<FormGroupProps<PurchaseDocument, Item>>>([]);
    return <PurchaseDocumentFormContext.Provider {...{value: { formGroups, setFormGroups: (value: Array<FormGroupProps<PurchaseDocument, Item>>) => setFormGroups(value), ...props.value } as FormContextProps<PurchaseDocument, Item>, children: props.children}} />
}
export const PurchaseDocumentFormContextConsumer = PurchaseDocumentFormContext.Consumer;