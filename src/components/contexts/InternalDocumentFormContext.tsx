import { createContext, PropsWithChildren, useState } from "react";
import { InternalDocument } from "../models/InternalDocument";
import { Item } from "../models/Item";
import { FormContextProps } from "../types/FormContextProps";
import { FormGroupProps } from "../types/FormProps";

const InternalDocumentFormContext = createContext<FormContextProps<InternalDocument, Item>>({} as FormContextProps<InternalDocument, Item>);
export const InternalDocumentFormContextProvider = (props: PropsWithChildren<{ value: Omit<FormContextProps<InternalDocument, Item>, 'formGroups' | 'setFormGroups'> }>) => {
    const [formGroups, setFormGroups] = useState<Array<FormGroupProps<InternalDocument, Item>>>([]);
    return <InternalDocumentFormContext.Provider {...{value: { formGroups, setFormGroups: (value: Array<FormGroupProps<InternalDocument, Item>>) => setFormGroups(value), ...props.value } as FormContextProps<InternalDocument, Item>, children: props.children}} />
}
export const InternalDocumentFormContextConsumer = InternalDocumentFormContext.Consumer;