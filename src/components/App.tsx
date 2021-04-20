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

const App = () => {
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
      }, result : ResultFetchApi = {
        response: null,
        error: null,
      };
      console.log(options)
      try {
        const response = await fetch(`/api/${restOptions.route}`, options);
        console.log(response)
        if (!response.ok) {
          result.error = {
            status: response.status,
            message: `${response.status}: ${response.statusText}`,
          };
        } else if (response.status === 204) { //204: no content
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
  const me = useCallback<(_token: string | null) => Promise<[User | null, ResultFetchApi | null]>>(async _token => {
    let result : ResultFetchApi | null = await fetchApi({route: 'Auth/Me', _token: _token});
    return [!!result?.response ? result.response as User : null, result];
  }, [fetchApi]);
  const login = useCallback<(_ : AuthBody & { 
    logIn?: () => void;
  }) => Promise<[string | null, ResultFetchApi | null]>>(async ({ logIn, Line, Instance, Company, Password, Username, grant_type }) => {
    let result : ResultFetchApi | null = {
      error: {
        message: null
      },
      response: null,
    }, _token: string | null = null, opened: boolean | null = null; 
    if ((!Username) && !!result.error) {
      result.error.message = `${result.error?.message || ''}\nMissing values: username`;
    }
    if (!Password && !!result.error) {
      result.error.message = `${result.error?.message || ''}\nMissing values: password`;
    }
    if (!result.error?.message) {
      const getToken: (_ : AuthBody) => Promise<[string | null, ResultFetchApi | null]> = async body => {
        let result : ResultFetchApi | null = await fetchApi({route: "token", method: "POST", body, contentType: "application/x-www-form-urlencoded"});
        return [!!result?.response ? result?.response.access_token as string : null, result];
      };
      const openPlatform: (_: {_token: string | null; body: OpenPlatformBody}) => Promise<[boolean | null, ResultFetchApi | null]> = async rest => {
        let result : ResultFetchApi | null = await fetchApi({route: 'Auth/Open', method: "POST", credentials: 'include', ...rest});
        return [!!result?.response ? result?.response as boolean : null, result];
      };
      [_token, result] = await getToken({Username, Password, Company, Line, Instance, grant_type});
      if (!!result?.error?.message) {
        [_token, result] = await getToken({Username, Password, Instance, grant_type});
      }
      if (!result?.error?.message) {
        [opened, result] = await openPlatform({_token: result?.response?.access_token ?? null, body: {Username, Password, ...config}})
        if (!opened && !!result)
          result.error = {
            message: `${result.error?.message}\nOcorreu um erro na abertura da plataforma.`, 
            ...result.error
          }; 
      }
      !!logIn && logIn();
    }
    return [_token, result];
  }, [fetchApi]);
  /*const callerApi = useCallback<(options: OptionsFetchApi) => Promise<[string | null, ResultFetchApi]>>(async (options : OptionsFetchApi) => {
    let result = await fetchApi(options), _token: string | null = null;
    if (result.error?.status === 401) { //expired token
      let stored_user : string | null = sessionStorage.getItem("user_session"),
      _user: User | null = !!stored_user ? JSON.parse(stored_user) : null;
      if (user !== _user) setUser(_user);
      if (!!_user) {
        [_token, result] = await login({..._user as User, ...config});
        if (!!result.error) alert(`Error\n${result.error.message}`); 
        result = await fetchApi(options);
      }
    }
    return [_token, result];
  }, [login, user, setUser, fetchApi]);*/
  useEffect(() => {
    if (!!user && !!token) return;
    let stored_token : string | null = sessionStorage.getItem("access_token"),
      stored_user : string | null = sessionStorage.getItem("user_session"),
      _user: User | null = !!stored_user ? JSON.parse(stored_user) : null;
    if (!!stored_token && !_user) {
      me(stored_token).then(([_user, result]) => {
        if (!!result?.error) { //403: Forbidden / 401: Token expired 
          alert(`Error\n${result.error.message}`); 
          return () => {
            setToken(null);
            stored_token = null;
            stored_user = null;
            _user = null;
            result = null;
          };
        }
        return () => {
          setUser(_user);
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
  }, [token, me, login, user]);
  return (
      <AppContext.Provider value={{
        fetchApi: fetchApi,
        token: token,
        setToken: setToken,
        employee: user,
        logout: logout,
        history: createBrowserHistory(),
        me: me,
        login: login,
      }}>
        <IonApp>
          <IonReactRouter>
            <IonContent>
              <MenuPage />
            </IonContent>
          </IonReactRouter>
        </IonApp>
      </AppContext.Provider>
  );
}

export default App;