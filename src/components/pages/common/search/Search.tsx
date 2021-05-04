//import { useState } from 'react';
import { search as iconSearch, add, removeOutline, trashBinOutline } from 'ionicons/icons';
import { FormContent } from "../form/Form"
import { Model } from "../../../models/Model"
import { IonItemDivider, IonLabel } from '@ionic/react';
import { Button } from '../buttons/Button';
import { Buttons } from '../buttons/Buttons';
import { FormContentProps } from '../../../types/FormProps';
import { FormContextProps } from '../../../types/FormContextProps';
import { SearchProps } from '../../../types/SearchProps';

export const Search = <T extends Model = {}> ({FormConsumer, formProps, ...searchProps} : FormContentProps<T> & SearchProps) => (
    !!FormConsumer 
        ? <FormConsumer>
            {contextProps => <SearchContent<T> {...contextProps} {...searchProps} />}
        </FormConsumer>
        : <SearchContent<T> {...formProps as FormContextProps<T>} {...searchProps} />
);

const SearchContent = <T extends Model = {}> ({search, setShowSearch, showSearch, clean, ...formProps} : FormContextProps<T> & SearchProps) => (
    <>
        <IonItemDivider>
            <IonLabel className="ion-text-uppercase">
                Pesquisa
            </IonLabel>
            <Button 
                icon={{
                    icon: showSearch ? removeOutline : add,
                    color: "dark"
                }}
                button={{
                    fill: "clear",
                    color:"light",
                    slot: "end",
                    className: "ion-align-self-end",
                    onClick: () => setShowSearch(!showSearch)
                }}
            />
        </IonItemDivider>
        {showSearch &&
            <>
                <FormContent<T> 
                    {...{ formProps }}
                    key={`${formProps.keyId}-search-form`}
                />
                <Buttons buttons={[{
                    text: "Pesquisar",
                    icon: {
                        icon: iconSearch,
                        color: "white"
                    },
                    label: {color: "white"},
                    button: {
                        onClick: () => search(),
                        color: "medium",
                    },
                }, {
                    text: "Limpar",
                    icon: {
                        icon: trashBinOutline,
                        color: "white"
                    },
                    label: {color: "white"},
                    button: {
                        onClick: () => clean(),
                        color: "danger",
                    },
                }]}/>
            </>
        }
    </>
)