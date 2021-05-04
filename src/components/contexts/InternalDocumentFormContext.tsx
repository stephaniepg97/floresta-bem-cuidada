import { createContext, PropsWithChildren } from "react";
import { RouteComponentProps } from "react-router";
import { useFormGroups } from "../hooks/FormGroups";
import { InternalDocument } from "../models/InternalDocument";
import { Item } from "../models/Item";
import { FormContextProps } from "../types/FormContextProps";

const InternalDocumentFormContext = createContext({} as FormContextProps<InternalDocument, Item>);
export const InternalDocumentFormContextProvider = ({value, children}: PropsWithChildren<{ value: Omit<FormContextProps<InternalDocument, Item>, 'reloadForm' | 'formGroups'> & Pick<RouteComponentProps, 'history'> }>) => {
    return <InternalDocumentFormContext.Provider {...{value: {...value, ...useFormGroups(value) } as FormContextProps<InternalDocument, Item>, children}} />
}
export const InternalDocumentFormContextConsumer = InternalDocumentFormContext.Consumer;