import { IonContent } from "@ionic/react";
import { ComponentProps, ComponentType, useContext } from "react";
import { Route, Switch } from "react-router";
import { MenuPage } from "../common/menu/MenuPage";
import { logOut, archive, card, key } from 'ionicons/icons';
import { Login } from "../auth/Login";
import { Password } from "../Password";
import { PurchaseDocumentList } from "../documents/purchase/PurchaseDocumentList";
import { AppContext } from '../../contexts/AppContext';
import { AppRouteProps } from "../../types/AppRouteProps";
import { Redirect } from "react-router";
import { Logout } from "../auth/Logout";
import { InternalDocumentList } from "../documents/internal/InternalDocumentList";
import { InternalDocumentForm } from "../documents/internal/InternalDocumentForm";
import { PurchaseDocumentForm } from "../documents/purchase/PurchaseDocumentForm";

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
      }
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
  const routes: Array<AppRouteProps> = [{
    render: () => !!token
      ? <Redirect key="login-route-redirect" to="/encomendas/all" />
      : <Login {...{
        keyId: "login",
        me: me,
        login: login,
      }}/>,
    path: "/login",
  }, {
    path: "/logout",
    render: () => !token
      ? <Redirect key="logout-route-redirect" to="/login" />
      : <Logout keyId= "logout"/>,
  }, {
    path: "/password/reset",
    render: () => !token
    ? <Redirect key="password-route-redirect" to="/login" />
      : <Password keyId= "password"/>,
  }, {
    path: "/encomendas/all",
    render: () => !token
    ? <Redirect key="encomendas-route-redirect" to="/login" />
      : <PurchaseDocumentList keyId= "encomendas"/>,
  }, {
    path: "/despesas/all",
    render: () => !token
    ? <Redirect key="despesas-route-redirect" to="/login" />
      : <InternalDocumentList keyId= "despesas"/>,
  }, {
    path: "/despesas/form",
    render: () => !token
    ? <Redirect key="despesas-form-route-redirect" to="/login" />
      : <InternalDocumentForm keyId= "despesas-form"/>,
  }, {
    path: "/encomendas/form",
    render: () => !token
    ? <Redirect key="encomendas-form-route-redirect" to="/login" />
      : <PurchaseDocumentForm keyId= "encomendas-form"/>,
  }];
  return (
    <IonContent>
      <MenuPage {...menuProps}>
        <Switch>
          <Redirect exact from="/" to={!token ? "/login" : "/encomendas/all"} />
          {routes.map((routeProps, index) => (
            <Route key={`${index}-route`} {...routeProps} />
          ))}
        </Switch>
      </MenuPage>
    </IonContent>
  );
}