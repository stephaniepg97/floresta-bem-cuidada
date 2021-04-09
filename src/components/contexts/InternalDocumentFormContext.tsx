import { createContext, PropsWithChildren } from "react";
import { useFormProps } from "../hooks/FormProps";
import { InternalDocument } from "../models/InternalDocument";
import { Item } from "../models/Item";
import { FormContextProps } from "../types/FormContextProps";

const InternalDocumentFormContext = createContext<FormContextProps<InternalDocument, Item>>({} as FormContextProps<InternalDocument, Item>);
export const InternalDocumentFormContextProvider = ({value, children}: PropsWithChildren<{ value: Omit<FormContextProps<InternalDocument, Item>, 'formGroups' | 'setFormGroups'> }>) => {
    const [formGroups, setFormGroups] = useFormProps(value); 
    return <InternalDocumentFormContext.Provider {...{value: {...value, formGroups, setFormGroups } as FormContextProps<InternalDocument, Item>, children}} />
}
export const InternalDocumentFormContextConsumer = InternalDocumentFormContext.Consumer;