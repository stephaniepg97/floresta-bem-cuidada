import React from 'react';
import {
    IonPopover,
} from '@ionic/react';
import { Model } from "../../../models/Model"
import { OptionsDialogProps} from "../../../types/OptionsDialogProps";
import { List } from "../list/List";
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { AppContext } from '../../../contexts/AppContext';
import "./OptionsDialog.scss"

export const OptionsDialog = <T extends Model>({
    listProps, 
    popoverProps,
    ...routeProps
}: OptionsDialogProps<T> & RouteComponentProps) => (
    <IonPopover {...popoverProps} cssClass={`dialog ${popoverProps.cssClass}`}>
        {popoverProps.children}
        {listProps && 
            <AppContext.Consumer>
                {contextProps => <List<T, any, any> key={`${routeProps.keyId}-dialog`} {...contextProps} {...listProps} {...routeProps} />}
            </AppContext.Consumer> 
        }
    </IonPopover>
);