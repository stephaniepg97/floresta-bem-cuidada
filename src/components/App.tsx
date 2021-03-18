import React, { 
  useCallback, 
  useEffect, 
  useReducer, 
  Reducer, 
  FC,
  ComponentType,
  ComponentProps,
} from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from "react-router";
import {
  IonApp,
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
import { logOut, arrowBack, archive, card, key } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';

import { Home } from "./pages/Home";
import { Login } from "./pages/login/Login";
import { Password } from "./pages/Password";
import { InternalDocumentForm } from "./pages/documents/internal/InternalDocumentForm";
import { InternalDocumentList } from "./pages/documents/internal/InternalDocumentList";
import { Button } from './pages/common/buttons/Button';

import { ResultFetchApi } from "./types/ResultFetchApi";
import { OptionsFetchApi } from "./types/OptionsFetchApi";
import { FormState } from './types/FormProps';
import { MenuItemProps } from './types/MenuItemProps';

import { Employee } from "./models/Employee";
import { InternalDocument } from './models/InternalDocument';
import { Item } from './models/Item';

import logoMenu from "../assets/img/logo400.png"

import { History } from 'history';
import { createBrowserHistory } from 'history';
import { PurchaseDocumentList } from './pages/documents/purchase/PurchaseDocumentList';

import './App.scss';
import config from "../config.json";

const App = () => {
  const [employee, setEmployee] = useReducer<Reducer<Employee | null, Employee | null>>((oldValue, newValue) => {
    sessionStorage.setItem("session_employee", JSON.stringify(newValue))
    return newValue;
  }, null);
  const [token, setToken] = useReducer<Reducer<string | null, string | null>>((oldValue, newValue) => {
    if (!newValue) {
      sessionStorage.removeItem("access_token")
      setEmployee(null);
    } else sessionStorage.setItem("access_token", newValue)
    return newValue;
  }, null);
  const fetchApi = useCallback<(o : OptionsFetchApi) => Promise<ResultFetchApi>>(
    async ({
      method = 'GET',
      body = null,
      contentType = 'application/json',
      _token = token,
      ...restOptions
    }) => {
      let options: RequestInit = {
        method: method,
        headers: {
          "Content-Type": `${contentType};charset=UTF-8`,
          ..._token && { "Authorization": `Bearer ${_token}` },
          ...restOptions.headers
        },
        ...restOptions,
        referrerPolicy: 'unsafe-url',
        ...(method === 'POST' || method === 'PUT') && {body: (typeof body !== 'string') ? JSON.stringify(body) : body}
      }, result : ResultFetchApi = {
        response: null,
        error: null,
      };
      console.log(options)
      try {
        const response = await fetch(
         // encodeURI(
            `${config.WEB_API_URL}${restOptions.route}`,
          //),
          options,
        );
        console.log(response)
        if (!response.ok) {
          result.error = {
            status: response.status,
            message: `${response.status}: ${response.statusText}`,
          };
        }
        else if (response.status === 204) { //204: no content
          result.response = response;
        } else {
          let contentType: string | null = response.headers.get("Content-Type");
          if (contentType && contentType.startsWith('application/json')) {
            result.response = await response.json();
          }
          if (contentType && contentType.startsWith('text/plain')) {
            result.response = await response.text();
          }
        }
        // result.error && console.log(result.error, { ...response })
      } catch (e) {
        console.log(e)
        result.error = {
          ...e,
          message: e.stack,
        };
        console.error(result.error)
      }
      return result;
    },
    [token],
  );
  const me = useCallback<(_token: string | null | undefined) => Promise<ResultFetchApi>>(async (_token) => await fetchApi({route: 'me', _token: _token, mode: 'cors', credentials: 'include'}), [fetchApi]);
  const login = useCallback<({ username, password} : { 
    username: string | undefined; 
    password: string | undefined; 
  }) => Promise<ResultFetchApi>>(async ({ username, password }) => {
    let result : ResultFetchApi = {
      error: {
        message: null
      },
      response: null,
    };
    if (!username && !!result.error) {
      result.error.message = `${result.error?.message || ''}\nMissing values: username`;
    }
    if (!password && !!result.error) {
      result.error.message = `${result.error?.message || ''}\nMissing values: password`;
    }
    if (!result.error?.message) {
      result = await fetchApi({route: "token", method: "POST", body: `${Object.entries({ ...{ username, password, company: config.COMPANY, instance: config.INSTANCE }, grant_type: "password" }).map(([key, value]) => `${key}=${value}`).join("&")}`, contentType: "application/x-www-form-urlencoded"});
      if (!!result.error?.message) {
        result = await fetchApi({route: "token", method: "POST", body: `${Object.entries({ ...{ username, password }, grant_type: "password" }).map(([key, value]) => `${key}=${value}`).join("&")}`, contentType: "application/x-www-form-urlencoded"});
      }
      setToken(result.response ? result.response.access_token : null);
    }
    return result;
  }, [fetchApi]);
  const history = createBrowserHistory();

  useEffect(() => {
    let stored : string | null = sessionStorage.getItem("access_token");
    if (stored && stored !== String(token)) {
      setToken(stored);
      return () => stored = null;
    }
    /*stored && me(stored).then(result => {
      if (result.error) {
        if (result.error.status !== 403) alert(`Error\n${result.error.message}`);
        else {
          stored = sessionStorage.getItem("session_employee");
          let employee : Employee | null = stored && JSON.parse(stored);
          console.log("session_employee", employee)
          if (employee)
            login({ username: employee.Codigo, password: employee.CDU_PasswordAppWeb }).then((result) => {
              return () => {stored = null};
            });
          else setToken(null);
        }
        return () => {stored = null};
      }
      setEmployee(result.response);
    })*/
    return () => {stored = null};
  }, [token, me, login]);

  const AuthRoute: FC<RouteProps> = (props) => (
    !token
      ? <Redirect to="/login" />
      : <Route {...props}>{props.children}</Route>
  );
  const sideMenu: Array<{header: string | undefined; items: Array<MenuItemProps>}> = [{
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
    header: employee?.Nome,
    items: [{
      routerLink: "/password/reset",
      title: "Alterar palavra-passe",
      icon: {
        icon: key,
      },
    }, {
      onClick: () => setToken(null),
      title: "Terminar sessão",
      icon: {
        icon: logOut,
      },
    }]
  }];
  return (
    <IonApp>
      <IonReactRouter>
        <IonContent>
          <MenuPage 
            menuProps={{
              menuId: "main-menu", 
              contentId: "content-pane",
              type: "overlay",
              // disabled: !!token,
            }}
            sideMenu={sideMenu}
            history={history}>
              <AuthRoute exact path="/">
                <Home />
              </AuthRoute>
              <Route path="/login" render={(props) => (
                token 
                ? <Redirect to="/" />
                : <Login fetchApi={fetchApi} token={token} login={login} me={me} {...props} />
              )} />
              <AuthRoute path="/password/reset">
                <Password />
              </AuthRoute>
              <AuthRoute path="/encomendas/all" render={(props) => <PurchaseDocumentList token={token} fetchApi={fetchApi} {...props} />} />
              <AuthRoute path="/despesas/all" render={(props) => <InternalDocumentList token={token} fetchApi={fetchApi} {...props} /> }/>
              <AuthRoute path="/despesas/form" render={(props) => (
                <InternalDocumentForm 
                  {...props}
                  {...props.location.state as FormState<InternalDocument, Item>}
                  token={token} 
                  fetchApi={fetchApi}
                />
              )} />
          </MenuPage>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
}

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

const MenuPage : FC<{
  sideMenu : Array<{header: string | undefined; items: Array<MenuItemProps>}>;
  menuProps: ComponentProps<typeof IonMenu>;
  history: History;
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
                  onClick: () => history.back(),
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

export default App;