import { search as iconSearch, add, removeOutline, trashBinOutline } from 'ionicons/icons';
import { FormContent } from "../form/Form"
import { IonItemDivider, IonLabel } from '@ionic/react';
import { Button } from '../buttons/Button';
import { Buttons } from '../buttons/Buttons';
import { FormContentProps } from '../../../types/FormProps';
import { FormContextProps } from '../../../types/FormContextProps';
import { SearchType } from '../../../models/Search';
import { SearchProps } from '../../../types/SearchProps';
import { Model } from '../../../models/Model';

export const Search = <T extends SearchType = {}, T1 extends Model = T> ({FormConsumer, formProps, ...searchProps} : FormContentProps<T, {}, T1> & Omit<SearchProps<T>, 'fetchApiOptions' | 'setFetchApiOptions'>) => (
    !!FormConsumer 
        ? <FormConsumer>
            {contextProps => <SearchContent<T, T1> {...contextProps} {...searchProps} />}
        </FormConsumer>
        : <SearchContent<T, T1> {...formProps as FormContextProps<T, {}, T1>} {...searchProps} />
);

const SearchContent = <T extends SearchType = {}, T1 extends Model = T> ({searchModel, fetchApiOptions, setSearchModel, clean, showSearch, setShowSearch, ...formProps} : FormContextProps<T, {}, T1> & Omit<SearchProps<T>, 'fetchApiOptions' | 'setFetchApiOptions'>) => (
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
                <FormContent<T, {}, T1> 
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
                        onClick: () => setSearchModel(searchModel),
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
);