import React from 'react';
import {
    IonPopover,
} from '@ionic/react';
import { Model } from "../../../models/Model"
import { OptionsDialogProps} from "../../../types/OptionsDialogProps";
import { List } from "../list/List";
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import "./OptionsDialog.scss"
import { AppContextProps } from '../../../types/AppContextProps';

export const OptionsDialog = <T extends Model>({
    listProps, 
    popoverProps,
    ...routeProps
}: OptionsDialogProps<T> & RouteComponentProps & AppContextProps) => (
    <IonPopover {...popoverProps} cssClass={`dialog ${popoverProps.cssClass}`}>
        {popoverProps.children}
        {listProps && <List<T, any, any> {...listProps} {...routeProps} />}
    </IonPopover>
);