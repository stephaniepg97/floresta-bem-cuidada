import { ComponentType, useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { AppContext } from "../../contexts/AppContext";
import { AppRouteProps } from "../../types/AppRouteProps";
import { Loading } from "../common/Loading";

export const Logout: ComponentType<RouteComponentProps & Pick<AppRouteProps, 'keyId'>> = ({keyId}) => {
    const [loading, setLoading] = useState(true);
    const appContext = useContext(AppContext);
    const logOut = useCallback(() => setLoading(false), [setLoading]);
    useEffect(() => {
        appContext.logout(logOut);
    }, [appContext, logOut])
    return (
        <Loading key={keyId} isOpen={loading} message="A terminar sessão..." />
    )
}