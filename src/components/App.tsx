import React, { 
  useCallback, 
  useEffect, 
  useReducer, 
  Reducer, 
} from 'react';
import { IonApp } from '@ionic/react';
import { ResultFetchApi } from "./types/ResultFetchApi";
import { OptionsFetchApi } from "./types/OptionsFetchApi";
import { User } from "./models/User";
import { AppRouter } from './pages/router/AppRouter';
import { AppContext } from './contexts/AppContext';
import { IonReactRouter } from '@ionic/react-router';
import { createBrowserHistory } from 'history'; 
import { AuthBody } from './models/AuthBody';
import { OpenPlatformBody } from './models/OpenPlatformBody';

import './App.scss';
import config from "../config.json";

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
  }) => Promise<ResultFetchApi>>(async ({ logIn, Line, Instance, Company, Password, Username, grant_type }) => {
    let result : ResultFetchApi = {
      error: {
        message: null
      },
      response: null,
    }, _token: string | null = null; 
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
      const openPlatform: (_: {_token: string | null; body: OpenPlatformBody}) => Promise<[string | null, ResultFetchApi]> = async rest => [rest._token, await fetchApi({route: 'Auth/AbrePlataformaEmpresaShell', method: "POST", credentials: 'include', ...rest})];
      [_token, result] = await getToken({Username, Password, Company, Line, Instance, grant_type});
      if (!!result.error?.message) {
        [_token, result] = await getToken({Username, Password, Instance, grant_type});
        if (!result.error?.message) {
          [_token, result] = await openPlatform({_token: result.response?.access_token ?? null, body: {Username, Password, ...config}})
        }
      }
      !!logIn && logIn();
      setToken(_token);
    }
    return result;
  }, [fetchApi]);

  useEffect(() => {
    let stored : string | null = sessionStorage.getItem("access_token");
    if (stored && stored !== String(token)) {
      setToken(stored);
      return () => { stored = null };
    }
    stored && me(stored).then(([user, result]) => {
      if (result.error?.status === 403 || result.error?.status === 401) { //403: Forbidden / 401: Token expired
        stored = sessionStorage.getItem("user_session");
        user = stored && JSON.parse(stored);
        console.log("user_session", user)
        !!user && login({...user, ...config})
          .then(result => {
            if (!!result.error) {
              alert(`Error\n${result.error.message}`); 
              setToken(null);
            }
          });
        !user && setToken(null);
      }
      if (!!result.error) {
        alert(`Error\n${result.error.message}`); 
        setToken(null);
      }
      setUser(user);
    })
    return () => { stored = null };
  }, [token, me, login]);
  return (
    <IonApp>
      <IonReactRouter>
        <AppContext.Provider value={{
          fetchApi: fetchApi,
          token: token,
          employee: user,
          logout: logout,
          history: createBrowserHistory(),
          me: me,
          login: login,
        }}>
            <AppRouter />
        </AppContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;