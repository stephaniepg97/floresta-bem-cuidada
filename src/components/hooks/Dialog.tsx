import { Dispatch, Reducer, useCallback, useEffect, useReducer } from "react";
import { MessageDialog } from "../pages/common/dialogs/message-dialog/MessageDialog";
import { ResultFetchApi } from "../types/ResultFetchApi";

export type DialogProps = {
    isOpen: boolean,
    result: ResultFetchApi,
}
export const useDialog = (setShowLoading?: Dispatch<React.SetStateAction<boolean>>) => {
    const [dialog, setDialog] = useReducer<Reducer<DialogProps, DialogProps>>((_, newValue) => {
        !!setShowLoading && newValue.isOpen && setShowLoading(false)
        return newValue;
      }, {
        isOpen: false,
        result: {} as ResultFetchApi,
      }), 
        showDialog = useCallback((result: ResultFetchApi) => setDialog({isOpen: true, result}), []),
        Dialog = () => (
            <MessageDialog {...{
                close: () => setDialog({isOpen: false, result: {} as ResultFetchApi}), 
                ...dialog, 
                popoverProps: {
                    ...dialog, 
                    onDidDismiss: () => setDialog({isOpen: false, result: {} as ResultFetchApi})
                }
            }} />
        );
    useEffect(() => console.log(dialog), [dialog])
    return {showDialog, Dialog}
}