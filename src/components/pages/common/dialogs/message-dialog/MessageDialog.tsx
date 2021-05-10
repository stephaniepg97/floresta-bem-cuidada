import { FunctionComponent } from "react";
import { DialogProps } from "../../../../types/DialogProps";
import { closeCircleOutline, checkmarkCircleOutline} from 'ionicons/icons';
import { Dialog } from "../Dialog";
import { ResultFetchApi } from "../../../../types/ResultFetchApi";
import "./MessageDialog.scss"
import { IonIcon, IonItem } from "@ionic/react";

export const MessageDialog: FunctionComponent<DialogProps & {result: ResultFetchApi}> = ({popoverProps, result, close, children}) => (
    <Dialog {...{ 
        popoverProps: {
            ...popoverProps, 
            onDidDismiss: () => close(),
            cssClass: "dialog-50x"
        }, 
        buttons: [{
            text: "Fechar",
            label: {color: "white"},
            button: {
                onClick: () => close(),
                color: result.status ? "success" : "danger",
            },
        }]
    }} >
        <div className="container">
            <IonItem lines="none">
                <IonIcon size="large" slot="start" icon={result.status ? checkmarkCircleOutline : closeCircleOutline} color={result.status ? "success" : "danger"}/>
                <label>{result?.response?.Message ?? result?.error?.response?.ExceptionMessage ?? result?.error?.response?.Message ?? result?.error?.response?.error}</label>
            </IonItem>
            <IonItem>
                <p slot="end" className={`${result.status ? "success" : "error"}`}> {result.statusMessage}</p>
            </IonItem>
            {children}
        </div>
    </Dialog>
);