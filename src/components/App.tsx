import React, { 
  useCallback, 
  useEffect, 
  useReducer, 
  Reducer, 
} from 'react';
import { IonApp } from '@ionic/react';
import { ResultFetchApi } from "./types/ResultFetchApi";
import { OptionsFetchApi } from "./types/OptionsFetchApi";
import { Employee } from "./models/Employee";
import { AppRouter } from './pages/router/AppRouter';
import { AppContext } from './contexts/AppContext';
import { IonReactRouter } from '@ionic/react-router';

import './App.scss';
import config from "../config.json";
import { useHistory } from 'react-router';

const App = () => {
  const [employee, setEmployee] = useReducer<Reducer<Employee | null, Employee | null>>((_, newValue) => {
    sessionStorage.setItem("session_employee", JSON.stringify(newValue))
    return newValue;
  }, null);
  const [token, setToken] = useReducer<Reducer<string | null, string | null>>((_, newValue) => {
    if (!newValue) {
      sessionStorage.removeItem("access_token")
      setEmployee(null);
    } else sessionStorage.setItem("access_token", newValue)
    return newValue;
  }, null);
  const logout = useCallback(() => setToken(null), [setToken]);
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
            restOptions.route,
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
  return (
    <IonApp>
      <IonReactRouter>
        <AppContext.Provider value={{
          fetchApi: fetchApi,
          token: token,
          employee: employee,
          logout: logout,
          history: useHistory(),
        }}>
            <AppContext.Consumer>
              {contextProps => <AppRouter {...contextProps} loginProps={{
                me: me,
                login: login,
                keyId: "login",
              }} />}
            </AppContext.Consumer>
        </AppContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;