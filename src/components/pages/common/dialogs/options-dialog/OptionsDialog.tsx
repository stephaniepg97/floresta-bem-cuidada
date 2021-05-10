import { Model } from "../../../../models/Model"
import { OptionsDialogProps} from "../../../../types/OptionsDialogProps";
import { List } from "../../list/List";
import { RouteComponentProps } from '../../../../types/RouteComponentProps';
import { SearchType } from '../../../../models/Search';
import { Dialog } from '../Dialog';

export const OptionsDialog = <T extends Model, SearchT extends SearchType, T1 extends Model = T>({
    listProps, 
    popoverProps,
    ...routeProps
}: OptionsDialogProps<T, SearchT, T1> & Omit<RouteComponentProps, 'fetchApiOptions'>) => (
    <Dialog {...{ popoverProps}}>
        {listProps && (
            <List<T, SearchT, {}, {}, T1> 
                key={`${routeProps.keyId}-dialog`} 
                {...listProps} 
                {...routeProps} />
        )}
    </Dialog>
);