import { History } from "history";
import { ComponentProps, ComponentType, FC } from "react";
import {
    IonRouterOutlet,
    IonContent,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonImg,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonPage,
    IonButtons,
    IonMenuButton,
    IonListHeader,
    IonItemDivider,
  } from '@ionic/react';
  import { arrowBack } from 'ionicons/icons';
import { MenuItemProps } from "../../../types/MenuItemProps";
import logoMenu from "../../../../assets/img/logo400.png"
import { Button } from "../buttons/Button";

export const MenuPage : FC<{
    sideMenu : Array<{header: string | undefined; items: Array<MenuItemProps>}>;
    menuProps: ComponentProps<typeof IonMenu>;
    history?: History;
  }> = ({sideMenu, menuProps, children, history}) => (
    <>
      <IonMenu {...menuProps}>
        <IonHeader>
          <IonItem id="headerMenu" lines="none">
            <IonImg id="logoMenu" src={logoMenu}/>
          </IonItem>
        </IonHeader>
        <IonContent>
          {sideMenu.map((item, index) =>
            <div key={index}> 
              <IonListHeader>
                <small className="ion-text-uppercase">{item.header}</small>
              </IonListHeader>
              <IonList>
                {item.items.map((menuItemProps, index) =>
                  <MenuItem key={index} {...menuItemProps} />
                )}
              </IonList>
            </div>
          )}
        </IonContent> 
      </IonMenu>
      <IonPage id={menuProps.contentId}>
        <IonHeader className="main-header ion-no-border">
          <IonToolbar>
            <IonButtons className="ion-margin-start" slot="start">
              <IonMenuButton 
                menu={menuProps.menuId} 
                color="primary" 
                autoHide={false} />
              <Button
                icon={{
                    icon: arrowBack,
                    color: "primary"
                }}
                button={{
                    fill: "clear",
                    slot: "start", 
                    onClick: () => history?.back(),
                }}
                visible />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonRouterOutlet id={menuProps.contentId}>
          {children}
        </IonRouterOutlet>
      </IonPage>
    </>
  );

  const MenuItem = ({ subItems, ...props } : MenuItemProps) => {
    const ItemChild: ComponentType<MenuItemProps> = ({ icon, title }) => (
      <>
        {icon && <IonIcon {...icon} slot="start" />}
        <IonLabel className="menu-item-text">
          {title}
        </IonLabel>
      </>
    );
    const Item: ComponentType<MenuItemProps> = (menuItemProps) => (
      <IonItem {...menuItemProps}>
        <ItemChild {...menuItemProps} />
      </IonItem>
    );
    return (
      <>
        {subItems ?
          <IonList>
            <IonItemDivider>
              <ItemChild {...props} />
            </IonItemDivider>
            {subItems.map((subMenuItemProps, index) => (
              <Item key={index} className="sub-menu-item" {...subMenuItemProps} />
            ))}
          </IonList>
          : <Item {...props} />
        }
      </>
    );
  };