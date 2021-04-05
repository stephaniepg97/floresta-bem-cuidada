import { IonContent } from "@ionic/react";
import { ComponentProps, ComponentType, useContext } from "react";
import { RouteComponentProps } from "react-router";
import { MenuPage } from "../common/menu/MenuPage";
import { logOut, archive, card, key } from 'ionicons/icons';
import { Login } from "../auth/Login";
import { Password } from "../Password";
import { PurchaseDocumentList } from "../documents/purchase/PurchaseDocumentList";
import { InternalDocumentList } from "../documents/internal/InternalDocumentList";
import { InternalDocumentForm } from "../documents/internal/InternalDocumentForm";
import { AppContext } from '../../contexts/AppContext';
import { LoginProps } from "../../types/LoginProps";
import { AppRoute } from "./AppRoute";
import { AppRouteProps } from "../../types/AppRouteProps";
import { InternalDocument } from "../../models/InternalDocument";
import { PurchaseDocument } from "../../models/PurchaseDocument";
import { PurchaseDocumentForm } from "../documents/purchase/PurchaseDocumentForm";
import { Redirect } from "react-router";
import { Logout } from "../auth/Logout";
import { FormState } from "../../types/FormProps";

export const AppRouter: ComponentType = () => {
  const {token, history, employee, login, me} = useContext(AppContext);
  const menuProps: ComponentProps<typeof MenuPage> = {
    menuProps: {
      menuId: "main-menu", 
      contentId: "content-pane", 
      type: "overlay", 
      disabled: !token 
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
      header: employee?.Nome,
      items: [{
        routerLink: "/password/reset",
        routerDirection: "root",
        title: "Alterar palavra-passe",
        icon: {
          icon: key,
        },
      }, {
        routerLink: "/logout",
        routerDirection: "root",
        title: "Terminar sessão",
        icon: {
          icon: logOut,
        },
      }]
    }],
    history: history
  };
  const routes: Array<AppRouteProps<RouteComponentProps> 
      | AppRouteProps<LoginProps> 
      | AppRouteProps<Pick<AppRouteProps, 'keyId'> & RouteComponentProps & FormState<InternalDocument | PurchaseDocument>>> = [{
    ComponentType: Login,
    componentProps: {
      me: me,
      login: login,
    },
    keyId: "login",
    auth: false,
    path: "/login",
  }, {
    ComponentType: Password,
    path: "/password/reset",
    keyId: "password",
    componentProps: {}
  }, {
    ComponentType: PurchaseDocumentList,
    path: "/encomendas/all",
    keyId: "encomendas",
    componentProps: {}
  }, {
    ComponentType: InternalDocumentList,
    path: "/despesas/all",
    keyId: "despesas",
    componentProps: {}
  }, {
    ComponentType: InternalDocumentForm,
    componentProps: {
      model: {} as InternalDocument,
    },
    keyId: "despesas-form",
    path: "/despesas/form"
  }, {
    ComponentType: PurchaseDocumentForm,
    componentProps: {
      model: {} as PurchaseDocument,
    },
    keyId: "encomendas-form",
    path: "/encomendas/form"
  }, {
    ComponentType: Logout,
    keyId: "logout",
    path: "/logout",
    componentProps: {}
  }];
  return (
    <IonContent>
      <MenuPage {...menuProps}>
        {routes.map((routeProps, index) => (
          <AppRoute<any> key={index} {...routeProps} />
        ))}
        <Redirect exact from="/" to={!token ? "/login" : "/encomendas/all"} />
      </MenuPage>
    </IonContent>
  );
}