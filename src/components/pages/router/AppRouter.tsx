import { IonContent } from "@ionic/react";
import { ComponentProps, ComponentType } from "react";
import { MenuPage } from "../common/menu/MenuPage";
import { logOut, archive, card, key } from 'ionicons/icons';
import { AppContextProps } from "../../types/AppContextProps";
import { Login } from "../login/Login";
import { Password } from "../Password";
import { PurchaseDocumentList } from "../documents/purchase/PurchaseDocumentList";
import { InternalDocumentList } from "../documents/internal/InternalDocumentList";
import { InternalDocumentForm } from "../documents/internal/InternalDocumentForm";

import { LoginProps } from "../../types/LoginProps";
import { AppRoute } from "./AppRoute";
import { AppRouteProps } from "../../types/AppRouteProps";
import { DocumentFormProps } from "../../types/DocumentFormProps";
import { InternalDocument } from "../../models/InternalDocument";
import { RouteComponentProps } from "../../types/RouteComponentProps";
import { PurchaseDocument } from "../../models/PurchaseDocument";
import { PurchaseDocumentForm } from "../documents/purchase/PurchaseDocumentForm";
import { Redirect } from "react-router";

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
        routerDirection: "root",
        title: "Encomendas",
        icon: {
          icon: archive,
        }
      }, {
        routerLink: "/despesas/all",
        routerDirection: "root",
        title: "Despesas",
        icon: {
          icon: card,
        }
      },
    ]}, {
      header: "Registar ou Alterar",
      items: [{
        routerLink: "/encomendas/form",
        routerDirection: "root",
        title: "Registo de Encomenda",
        icon: {
          icon: archive,
        }
      }, {
        routerLink: "/despesas/form",
        routerDirection: "root",
        title: "Registo de Despesa",
        icon: {
          icon: card,
        }
      },
    ]}, {
      header: contextProps.employee?.Nome,
      items: [{
        routerLink: "/password/reset",
        routerDirection: "root",
        title: "Alterar palavra-passe",
        icon: {
          icon: key,
        },
      }, {
        onClick: () => contextProps.logout(),
        routerOptions: {unmount: true},
        title: "Terminar sessão",
        icon: {
          icon: logOut,
        },
      }]
    }],
    history: contextProps.history
  };
  const routes: Array<AppRouteProps<RouteComponentProps> | AppRouteProps<LoginProps> | AppRouteProps<DocumentFormProps<InternalDocument>>> = [{
    Component: Login,
    contextProps: contextProps,
    componentProps: loginProps,
    auth: false,
    path: "/login",
  }, {
    Component: Password,
    contextProps: contextProps,
    path: "/password/reset",
    componentProps: {
      keyId: "password"
    }
  }, {
    Component: PurchaseDocumentList,
    contextProps: contextProps,
    path: "/encomendas/all",
    componentProps: {
      keyId: "encomendas"
    }
  }, {
    Component: InternalDocumentList,
    contextProps: contextProps,
    path: "/despesas/all",
    componentProps: {
      keyId: "despesas"
    }
  }, {
    Component: InternalDocumentForm,
    contextProps: contextProps,
    componentProps: {
      model: {} as InternalDocument,
      keyId: "despesas-form"
    },
    path: "/despesas/form"
  }, {
    Component: PurchaseDocumentForm,
    contextProps: contextProps,
    componentProps: {
      model: {} as PurchaseDocument,
      keyId: "encomendas-form"
    },
    path: "/encomendas/form"
  }];
  return (
    <IonContent>
      <MenuPage {...menuProps}>
        {routes.map((routeProps, index) => (
          <AppRoute<any> key={index} {...routeProps} />
        ))}
        <Redirect exact from="/" to={!contextProps.token ? "/login" : "/encomendas/all"} />
      </MenuPage>
    </IonContent>
  );
}