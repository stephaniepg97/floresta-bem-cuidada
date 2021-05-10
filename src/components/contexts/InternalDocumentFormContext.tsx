import { createContext, PropsWithChildren } from "react";
import { RouteComponentProps } from "react-router";
import { useFormGroups } from "../hooks/FormGroups";
import { InternalDocument } from "../models/InternalDocument";
import { Item } from "../models/Item";
import { FormContextProps } from "../types/FormContextProps";
import { InternalDocTypeList, InternalDocFamilyList } from "../../config.json"

const InternalDocumentFormContext = createContext({} as FormContextProps<InternalDocument, Item>);
export const InternalDocumentFormContextProvider = ({value, children}: PropsWithChildren<{ value: Omit<FormContextProps<InternalDocument, Item>, 'reloadForm' | 'formGroups'> & Pick<RouteComponentProps, 'history'> }>) => {
    return <InternalDocumentFormContext.Provider {...{value: {...value, ...useFormGroups({...value, listIdDocFamilies: InternalDocFamilyList, listIdDocTypes: InternalDocTypeList }) } as FormContextProps<InternalDocument, Item>, children}} />
}
export const InternalDocumentFormContextConsumer = InternalDocumentFormContext.Consumer;