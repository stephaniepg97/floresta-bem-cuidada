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

import './App.scss';
import config from "../config.json";
import { IonReactRouter } from '@ionic/react-router';
import { MenuPage } from './pages/common/menu/MenuPage';

const App = () => {
  const [user, setUser] = useReducer<Reducer<User | null, User | null>>((_, newValue) => {
    sessionStorage.setItem("user_session", JSON.stringify(newValue))
    return newValue;
  }, null);
  const [token, setToken] = useReducer<Reducer<string | null, string | null>>((_, newValue) => {
    if (!newValue) {
      sessionStorage.removeItem("access_token")
      setUser(null);
    } else sessionStorage.setItem("access_token", newValue)
    return newValue;
  }, null);
  const logout = useCallback<(logOut: () => void) => void>(logOut => new Promise(executor => {
    return setTimeout(executor, 1000);
  }).then(() => {
    logOut();
    setToken(null);
  }), [setToken]);
  const fetchApi = useCallback<(o : OptionsFetchApi) => Promise<ResultFetchApi>>(
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
  const me = useCallback<(_token: string | null) => Promise<[User | null, ResultFetchApi]>>(async _token => {
    let result : ResultFetchApi = await fetchApi({route: 'Auth/Me', _token: _token});
    return [!!result.response ? result.response as User : null, result];
  }, [fetchApi]);
  const login = useCallback<(_ : AuthBody & { 
    logIn?: () => void;
  }) => Promise<[string | null, ResultFetchApi]>>(async ({ logIn, Line, Instance, Company, Password, Username, grant_type }) => {
    let result : ResultFetchApi = {
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
      const getToken: (_ : AuthBody) => Promise<[string | null, ResultFetchApi]> = async body => {
        let result : ResultFetchApi = await fetchApi({route: "token", method: "POST", body, contentType: "application/x-www-form-urlencoded"});
        return [!!result.response ? result.response.access_token as string : null, result];
      };
      const openPlatform: (_: {_token: string | null; body: OpenPlatformBody}) => Promise<[boolean | null, ResultFetchApi]> = async rest => {
        let result : ResultFetchApi = await fetchApi({route: 'Auth/Open', method: "POST", credentials: 'include', ...rest});
        return [!!result.response ? result.response as boolean : null, result];
      };
      [_token, result] = await getToken({Username, Password, Company, Line, Instance, grant_type});
      if (!!result.error?.message) {
        [_token, result] = await getToken({Username, Password, Instance, grant_type});
        if (!result.error?.message) {
          [opened, result] = await openPlatform({_token: result.response?.access_token ?? null, body: {Username, Password, ...config}})
          if (!opened)
            result.error = {
              message: `${result.error?.message}\nOcorreu um erro na abertura da plataforma.`, 
              ...result.error
            }; 
        }
      }
      !!logIn && logIn();
    }
    return [_token, result];
  }, [fetchApi]);

  useEffect(() => {
    let stored_token : string | null = sessionStorage.getItem("access_token");
    if (stored_token && stored_token !== String(token)) {
      setToken(stored_token);
      return () => { stored_token = null };
    }
    let stored_user : string | null = sessionStorage.getItem("user_session");
    let _user: User | null = !!stored_user ? JSON.parse(stored_user) : null;
    if (!stored_token && !stored_user) {
      if (token || user) setToken(null)
      else return () => { 
        stored_token = null; 
        stored_user = null;
        _user = null;
      };
    }
    if (stored_token && stored_user) {
      if (!token) setToken(stored_token)
      if (!user) setUser(_user)
      else return () => { 
        stored_token = null; 
        stored_user = null;
        _user = null;
      };
    }
    if (!stored_token) {
      login({..._user as User, ...config}).then(([_token, result]) => {
        if (!!result.error) {
          alert(`Error\n${result.error.message}`); 
          setToken(null);
        } else setToken(_token);
        if (_user !== user) setUser(_user);
        else return () => { 
          stored_token = null; 
          stored_user = null;
          _user = null;
        };
      });
    } else {
      me(stored_token).then(([_user, result]) => {
        if (!!result.error) { //403: Forbidden / 401: Token expired
          alert(`Error\n${result.error.message}`); 
          setToken(null)
        }
        if (_user !== user) setUser(_user);
        else return () => { 
          stored_token = null; 
          stored_user = null;
          _user = null;
        };
      })
    }
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