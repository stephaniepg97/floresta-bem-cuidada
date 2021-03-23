import { IonContent } from "@ionic/react";
import { ComponentProps, ComponentType } from "react";
import { MenuPage } from "../common/menu/MenuPage";
import { logOut, archive, card, key } from 'ionicons/icons';
import { AppContextProps } from "../../types/AppContextProps";
import { Home } from "../Home";
import { Login } from "../login/Login";
import { Password } from "../Password";
import { PurchaseDocumentList } from "../documents/purchase/PurchaseDocumentList";
import { InternalDocumentList } from "../documents/internal/InternalDocumentList";
import { InternalDocumentForm } from "../documents/internal/InternalDocumentForm";

import { LoginProps } from "../../types/LoginProps";
import { AppRoute } from "./AppRoute";
import { AppRouteProps } from "../../types/AppRouteProps";
import { InternalDocumentFormProps } from "../../types/InternalDocumentFormProps";
import { InternalDocument } from "../../models/InternalDocument";
import { RouteComponentProps } from "../../types/RouteComponentProps";

export const AppRouter: ComponentType<AppContextProps & {loginProps: LoginProps}> = ({loginProps, ...contextProps}) => {
  const menuProps: ComponentProps<typeof MenuPage> = {
    menuProps: {
      menuId: "main-menu", 
      contentId: "content-pane", 
      type: "overlay", 
      disabled: !contextProps.token 
    }, 
    sideMenu: [{
      header: "Documentos",
      items: [{
        routerLink: "/encomendas/all",
        title: "Encomendas",
        icon: {
          icon: archive,
        }
      }, {
        routerLink: "/despesas/all",
        title: "Despesas",
        icon: {
          icon: card,
        }
      },
    ]}, {
      header: "Registar ou Alterar",
      items: [{
        routerLink: "/encomendas/form",
        title: "Registo de Encomenda",
        icon: {
          icon: archive,
        }
      }, {
        routerLink: "/despesas/form",
        title: "Registo de Despesa",
        icon: {
          icon: card,
        }
      },
    ]}, {
      header: contextProps.employee?.Nome,
      items: [{
        routerLink: "/password/reset",
        title: "Alterar palavra-passe",
        icon: {
          icon: key,
        },
      }, {
        onClick: () => contextProps.logout,
        title: "Terminar sessão",
        icon: {
          icon: logOut,
        },
      }]
    }],
    history: contextProps.history
  };
  const routes: Array<AppRouteProps<RouteComponentProps> | AppRouteProps<LoginProps> | AppRouteProps<InternalDocumentFormProps>> = [{
    Component: Home,
    contextProps: contextProps,
    exact: true,
    path: "/",
    componentProps: {str_key: 'home'}
  }, {
    Component: Login,
    contextProps: contextProps,
    componentProps: loginProps,
    auth: false,
    path: "/"
  }, {
    Component: Password,
    contextProps: contextProps,
    path: "/password/reset",
    componentProps: {str_key: 'password'}
  }, {
    Component: PurchaseDocumentList,
    contextProps: contextProps,
    path: "/encomendas/all",
    componentProps: {str_key: 'encomendas'}
  }, {
    Component: InternalDocumentList,
    contextProps: contextProps,
    path: "/despesas/all",
    componentProps: {str_key: 'despesas'}
  }, {
    Component: InternalDocumentForm,
    contextProps: contextProps,
    componentProps: {
      model: {} as InternalDocument,
      str_key: 'despesas-form'
    },
    path: "/despesas/form"
  }];
  return (
    <IonContent>
      <MenuPage {...menuProps}>
        {routes.map((routeProps, index) => (
          <AppRoute<any> key={index} {...routeProps} />
        ))}
      </MenuPage>
    </IonContent>
  );
}