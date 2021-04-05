import { RouteComponentProps } from "react-router";
import { AppRouteProps } from "../../types/AppRouteProps";
import { Redirect, Route } from "react-router";
import { AppContext } from "../../contexts/AppContext";
import { memo } from "react";

export const AppRoute = <T extends RouteComponentProps = RouteComponentProps> ({
    ComponentType, 
    auth = true, 
    componentProps = {},
    exact = false,
    path,
    keyId
}: AppRouteProps<T>) => {
    const RouteComponent = memo((routeComponentProps: RouteComponentProps) => <ComponentType keyId={keyId} {...{...componentProps, ...routeComponentProps} as T} />);
    return (
        <AppContext.Consumer>
            {contextProps => <Route key={`${keyId}-route`} exact={exact} path={path} render={(routeComponentProps) => (
                (auth && !contextProps.token) || (!auth && !!contextProps.token)
                    ? <Redirect key={`${keyId}-route-redirect`} to={auth ? "/login" : "/encomendas/all"} />
                    : <RouteComponent {...routeComponentProps} />
                )} 
            />}
        </AppContext.Consumer>
    );
}