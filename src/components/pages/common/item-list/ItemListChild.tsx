import { IonCheckbox, IonItem } from "@ionic/react";
import { useCallback } from "react";
import { Model } from "../../../models/Model";
import { ButtonProps } from "../../../types/ButtonProps";
import { ColumnProps } from "../../../types/ColumnProps";
import { ItemListChildProps } from "../../../types/ItemListProps";
import { Input } from "../inputs/Input";

export const ItemListChild = <T extends Model, T1 extends Model> ({
    checkbox, 
    size, 
    inputProps, 
    Field, 
    xfield,
    xModel,
    model,
    position,
    onClick,
    selected,
    setButtons,
    buttons,
    ...props 
}: ColumnProps<T, T1> & Pick<ItemListChildProps<T, T1>, 'position' | 'onClick' | 'selected' | 'setButtons' | 'buttons' | 'model'>) => {
    const setEndButtons = useCallback<(titles: Array<string>, visible: boolean) => void>((titles, visible) => setButtons && !!buttons && setButtons(buttons.map<ButtonProps>(buttonProps => buttonProps?.button?.title && titles.includes(buttonProps.button.title) ? {...buttonProps, visible: visible} : buttonProps)), [setButtons, buttons]);
    return (
        <IonItem lines="none" color="transparent" onClick={() => {
            if (!!inputProps?.readonly && !checkbox && onClick && xModel) onClick(xModel.current)
        }}>
            {checkbox && selected && xModel ? 
                <IonCheckbox
                    checked={selected.current.includes(xModel.current)} 
                    onIonChange={() => {
                        let last = selected.current.length === 0;
                        if (selected.current.includes(xModel.current)) selected.current.splice(selected.current.indexOf(xModel.current), 1);
                        else selected.current.push(xModel.current);
                        setEndButtons(["create", "reset"], last || selected.current.length !== 0); 
                    }}
                /> :  
                <Input<T, T1>
                    {...props}
                    {...inputProps ? {
                        inputProps: {
                            ...inputProps,
                            onIonChange: () => setEndButtons(["save"], true),
                            className: "ion-text-center"
                        }
                    } : {
                        Field: Field as React.ComponentType<{
                            value?: object | undefined;
                        }>,
                        xfield: xfield || null
                    }}
                    {...{xModel, model, position}}
                    key={`${props.label} input-list`}
                />
            }
        </IonItem>  
    );
} 