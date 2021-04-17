import React, { useRef } from 'react';
import {
    IonPopover,
} from '@ionic/react';
import { Model } from "../../../models/Model"
import { OptionsDialogProps} from "../../../types/OptionsDialogProps";
import { List } from "../list/List";
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { Buttons } from '../buttons/Buttons';
import { add, remove } from 'ionicons/icons';
import "./OptionsDialog.scss"

export const OptionsDialog = <T extends Model>({
    listProps, 
    popoverProps,
    ...routeProps
}: OptionsDialogProps<T> & RouteComponentProps) => {
    const model = useRef<T>({} as T);
    return (
        <IonPopover {...popoverProps} cssClass={`dialog ${popoverProps.cssClass}`}>
            {popoverProps.children}
            {listProps && (
                <>
                    <List<T> model={model} key={`${routeProps.keyId}-dialog`} {...listProps} {...routeProps} />
                    <Buttons 
                        buttons={[{
                            text: "OK",
                            icon: {
                                icon: add,
                                color: "white"
                            },
                            label: {color: "white"},
                            button: {
                                onClick: () => {},
                                color: "success",
                            },
                        }, {
                            text: "Cancelar",
                            icon: {
                                icon: remove,
                                color: "white"
                            },
                            label: {color: "white"},
                            button: {
                                onClick: () => {},
                                color: "medium",
                            },
                        }]}
                    />
                </>
            )}
        </IonPopover>
    );
}