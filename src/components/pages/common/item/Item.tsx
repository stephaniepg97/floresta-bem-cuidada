import React, { ComponentProps } from 'react';
import {
    IonItem,
    IonGrid,
    IonCol,
    IonRow
} from '@ionic/react';

import { ColumnProps } from "../../../types/ColumnProps"

export const Item = <C,>({itemProps, colProps, Children, fields: columns}: {
    itemProps?: ComponentProps<typeof IonItem>;
    colProps?: ComponentProps<typeof IonCol>;
    Children: (col : ColumnProps<C>) => React.ReactElement;
    fields: Array<ColumnProps<C>>;
}) => (
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