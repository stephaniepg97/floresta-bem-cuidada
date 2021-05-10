import { 
  useCallback, 
  useEffect, 
  useReducer, 
  Reducer,
} from 'react';
import { IonApp, IonContent } from '@ionic/react';
import { ResultFetchApi } from "./types/ResultFetchApi";
import { OptionsFetchApi } from "./types/OptionsFetchApi";
import { User } from "./models/User";
import { AppContext } from './contexts/AppContext'; 
import { createBrowserHistory } from 'history'; 
import { AuthBody } from './models/AuthBody';
import { OpenPlatformBody } from './models/OpenPlatformBody';
import { IonReactRouter } from '@ionic/react-router';
import { MenuPage } from './pages/common/menu/MenuPage';

import config from "../config.json";
import './App.scss';
import { useDialog } from './hooks/Dialog';

const App = () => {
  const {Dialog, showDialog} = useDialog();
  const [user, setUser] = useReducer<Reducer<User | null, User | null>>((_, newValue) => {
    sessionStorage.setItem("user_session", JSON.stringify(newValue))
    return newValue;
  }, !!sessionStorage.getItem("user_session") ? JSON.parse(sessionStorage.getItem("user_session") as string) as User : null);
  const [token, setToken] = useReducer<Reducer<string | null, string | null>>((_, newValue) => {
    if (!newValue) {
      sessionStorage.removeItem("access_token")
      setUser(null);
    } else sessionStorage.setItem("access_token", newValue)
    return newValue;
  }, sessionStorage.getItem("access_token"));
  const logout = useCallback<(logOut: () => void) => Promise<void>>(async logOut => new Promise(executor => {
    return setTimeout(executor, 1000);
  }).then(() => {
    logOut();
    setToken(null);
  }), [setToken]);
  const fetchApi = useCallback<(o : OptionsFetchApi) => Promise<ResultFetchApi | null>>(
    async ({
      method = 'GET',
      body = null,
      contentType = 'application/json;charset=UTF-8',
      _token = token,
      ...restOptions
    }) => {
      let options: RequestInit = {
        method: method,
        headers: {
          "Content-Type": contentType,
          ..._token && { "Authorization": `Bearer ${_token}` },
          ...restOptions.headers
        },
        ...restOptions,
        ...(method === 'POST' || method === 'PUT') && !!body && { body: 
          typeof body !== 'string' ? 
            contentType.startsWith("application/x-www-form-urlencoded") ? 
              Object.entries(body).map(([key, value]) => `${key}=${value}`).join("&")
            : JSON.stringify(body) 
          : body}
      }, result: ResultFetchApi  = {
        status: false,
        statusCode: -1,
        statusMessage: null,
        error: null,
      };
      console.log(options)
      try {
        const response = await fetch(encodeURI(`/api/${restOptions.route}`), options);
        result = {
          status: response.ok,
          statusCode: response.status,
          statusMessage: `${response.status}: ${response.statusText}`,
          ...response.ok ? { response } : { error: response }
        }
        console.log(response)
        if (response.status !== 204) { //204: no content
          let contentType: string | null = response.headers.get("Content-Type");
          if (contentType && contentType.startsWith('application/json')) {
            result = {status: result.status, statusMessage: result.statusMessage, statusCode: result.statusCode, ...!!result.error 
              ? { error: {response: await response.json() } } 
              : { response: await response.json() }
            };
          }
          if (contentType && contentType.startsWith('text/plain')) {
            result = {status: result.status, statusMessage: result.statusMessage, statusCode: result.statusCode, ...!!result.error 
              ? { error: {response: await response.text() } } 
              : { response: await response.text() }
            };
          }
        }
      } catch (e) {
        console.log(e)
        result.error = {
          ...e,
          statusMessage: e.stack,
        };
        console.error(result.error)
      }
      return result;
    },
    [token],
  );
  const me = useCallback<(_token: string | null) => Promise<[User | null, ResultFetchApi | null]>>(async _token => {
    let result : ResultFetchApi | null = await fetchApi({route: 'Auth/Me', _token: _token});
    return [!!result?.response ? result.response as User : null, result];
  }, [fetchApi]);
  const login = useCallback<(_ : AuthBody & { 
    logIn?: () => void;
  }) => Promise<[string | null, ResultFetchApi | null]>>(async ({ logIn, Line, Instance, Company, Password, Username, grant_type }) => {
    let result : ResultFetchApi | null = {
      status: false,
      statusCode: -1,
      statusMessage: null,
      error: null,
    }, _token: string | null = null; 
    if ((!Username) && !!result.error) {
      result.error = { response: { Message: `${result.error?.response?.Message || ''}\nMissing values: username` } };
    }
    if (!Password && !!result.error) {
      result.error = { response: { Message: `${result.error?.response?.Message || ''}\nMissing values: password` } };
    }
    if (!result.error?.response) {
      const getToken: (_ : AuthBody) => Promise<[string | null, ResultFetchApi | null]> = async body => {
        let result : ResultFetchApi | null = await fetchApi({route: "token", method: "POST", body, contentType: "application/x-www-form-urlencoded"});
        return [!!result?.response ? result?.response.access_token as string : null, result];
      };
      const openPlatform: (_: {_token: string | null; body: OpenPlatformBody}) => Promise<ResultFetchApi | null> = async rest => await fetchApi({route: 'Auth/Open', method: "POST", credentials: 'include', ...rest});
      [_token, result] = await getToken({Username, Password, Company, Line, Instance, grant_type});
      if (!result?.status) {
        [_token, result] = await getToken({Username, Password, Instance, grant_type});
      }
      if (result?.status) {
        result = await openPlatform({_token: result?.response?.access_token ?? null, body: {Username, Password, ...config}})
      }
      !!logIn && logIn();
    }
    return [_token, result];
  }, [fetchApi]);
  useEffect(() => {
    if (!!user && !!token) return;
    let stored_token : string | null = sessionStorage.getItem("access_token"),
      stored_user : string | null = sessionStorage.getItem("user_session"),
      _user: User | null = !!stored_user ? JSON.parse(stored_user) : null;
    if (!!stored_token && !_user) {
      me(stored_token).then(([_user, result]) => {
        if (!!result?.error) { //403: Forbidden / 401: Token expired 
          showDialog(result);
          setToken(null); 
          return () => {
            stored_token = null;
            stored_user = null;
            _user = null;
            result = null;
          };
        }
        setUser(_user);
        return () => {
          stored_token = null;
          stored_user = null;
          _user = null;
          result = null;
        };
      })
    }
    return () => {
      stored_token = null;
      stored_user = null;
      _user = null;
    };
  }, [token, me, login, user, showDialog]);
  return (
      <AppContext.Provider value={{
        fetchApi,
        token,
        setToken,
        employee: user,
        logout,
        history: createBrowserHistory(),
        me,
        login,
      }}>
        <IonApp>
          <IonReactRouter>
            <IonContent>
              <MenuPage />
              <Dialog />
            </IonContent>
          </IonReactRouter>
        </IonApp>
      </AppContext.Provider>
  );
}

export default App;