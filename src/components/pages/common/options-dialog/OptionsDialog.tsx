import { IonPopover } from '@ionic/react';
import { Model } from "../../../models/Model"
import { OptionsDialogProps} from "../../../types/OptionsDialogProps";
import { List } from "../list/List";
import { RouteComponentProps } from '../../../types/RouteComponentProps';
import { Buttons } from '../buttons/Buttons';
import { add, remove } from 'ionicons/icons';
import "./OptionsDialog.scss"
import { SearchType } from '../../../models/Search';

export const OptionsDialog = <T extends Model, SearchT extends SearchType, T1 extends Model = T>({
    listProps, 
    popoverProps,
    ...routeProps
}: Omit<OptionsDialogProps<T, SearchT, T1>, 'children'> & RouteComponentProps) => (
    <IonPopover {...popoverProps} cssClass={`dialog ${popoverProps.cssClass}`}>
        {listProps && (
            <>
                <List<T, SearchT, {}, {}, T1> 
                    key={`${routeProps.keyId}-dialog`} 
                    {...listProps} 
                    {...routeProps} />
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