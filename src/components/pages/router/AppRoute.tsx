import { RouteComponentProps } from "../../types/RouteComponentProps";
import {
  Route,
  Redirect,
} from "react-router";
import { AppRouteProps } from "../../types/AppRouteProps";

export const AppRoute = <T extends RouteComponentProps = RouteComponentProps> ({
    Component, 
    auth = true, 
    componentProps = {} as T, 
    contextProps,
    exact = false,
    path
}: AppRouteProps<T>) => (
    <Route exact={exact} path={path} render={(routeComponentProps) => (
        (auth && !contextProps.token) || (!auth && !!contextProps.token)
        ? <Redirect to={auth ? "/login" : "/"} />
        : <Component {...contextProps} {...routeComponentProps} {...componentProps}/>
        )} 
    />
);