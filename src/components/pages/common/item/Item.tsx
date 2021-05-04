import React, { ComponentProps } from 'react';
import {
    IonItem,
    IonGrid,
    IonCol,
    IonRow
} from '@ionic/react';

import { ColumnProps } from "../../../types/ColumnProps"
import { Model } from '../../../models/Model';
import { ListProps } from '../../../types/ListProps';

export const Item = <T extends Model = {}, T1 extends Model = T>({itemProps, colProps, Children, fields: columns}: {
    itemProps?: ComponentProps<typeof IonItem>;
    colProps?: ComponentProps<typeof IonCol>;
    Children: (col : ColumnProps<T, T1>) => React.ReactElement;
    fields: Array<ColumnProps<T, T1>>;
} & Pick<ListProps<T, {}, T1>, 'fields'>) => (
    <IonItem {...itemProps}>
        <IonGrid>
            <IonRow>
                {columns.map((col, index) => (
                    <IonCol
                        size={col.size}
                        {...colProps}
                        key={index}>
                        <Children {...col} />
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    </IonItem>
);