import { RouteComponentProps } from "../../types/RouteComponentProps";
import { AppRouteProps } from "../../types/AppRouteProps";
import { Redirect, Route } from "react-router";

export const AppRoute = <T extends RouteComponentProps = RouteComponentProps> ({
    Component, 
    auth = true, 
    componentProps = {} as T, 
    contextProps,
    exact = false,
    path,
}: AppRouteProps<T>) => (
    <Route key={componentProps.keyId} exact={exact} path={path} render={(routeComponentProps) => (
        (auth && !contextProps.token) || (!auth && !!contextProps.token)
        ? <Redirect to={auth ? "/login" : "/encomendas/all"} />
        : <Component key={componentProps.keyId} {...contextProps} {...routeComponentProps} {...componentProps}/>
        )} 
    />
);