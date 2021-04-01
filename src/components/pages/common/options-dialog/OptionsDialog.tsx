import React from 'react';
import {
    IonPopover,
} from '@ionic/react';
import { Model } from "../../../models/Model"
import { OptionsDialogProps} from "../../../types/OptionsDialogProps";
import { List } from "../list/List";
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import "./OptionsDialog.scss"

export const OptionsDialog = <T extends Model>({
    listProps, 
    popoverProps,
    ...routeProps
}: OptionsDialogProps<T> & RouteComponentProps) => (
    <IonPopover {...popoverProps} cssClass={`dialog ${popoverProps.cssClass}`}>
        {popoverProps.children}
        {listProps && <List<T, any, any> key={`${routeProps.keyId}-dialog`} {...listProps} {...routeProps} />}
    </IonPopover>
);