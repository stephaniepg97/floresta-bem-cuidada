import { RouteComponentProps } from "react-router";
import { AppRouteProps } from "../../types/AppRouteProps";
import { Redirect, Route } from "react-router";
import { AppContext } from "../../contexts/AppContext";

export const AppRoute = <T extends RouteComponentProps = RouteComponentProps> ({
    Component, 
    auth = true, 
    componentProps = {},
    exact = false,
    path,
    keyId
}: AppRouteProps<T>) => (
    <AppContext.Consumer>
        {contextProps => <Route key={keyId} exact={exact} path={path} render={(routeComponentProps) => (
            (auth && !contextProps.token) || (!auth && !!contextProps.token)
            ? <Redirect to={auth ? "/login" : "/encomendas/all"} />
            : <Component key={keyId} keyId={keyId} {...{...componentProps, ...routeComponentProps} as T}/>
            )} 
        />}
    </AppContext.Consumer>
);