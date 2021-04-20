import { PropsWithChildren } from 'react';
import { IonList } from '@ionic/react';
import { Item } from "../item/Item";
import { Model } from "../../../models/Model"
import { ItemListProps } from '../../../types/ItemListProps';
import { ItemListChild } from './ItemListChild';
import "./ItemList.scss";

export const ItemList = <T extends Model, T1 extends Model = T> ({ 
    children,
    itemProps,
    fields,
    ...props
} : PropsWithChildren<ItemListProps<T, T1>>) => (
    <IonList className="main-list">
        <Item<T, T1>
            fields={fields}
            itemProps={{className: "ion-list-item", ...itemProps}} 
            Children={(col) => 
                <ItemListChild<T, T1>
                    {...col}
                    {...props}
                />
            }
        />
        {children}
    </IonList>
);