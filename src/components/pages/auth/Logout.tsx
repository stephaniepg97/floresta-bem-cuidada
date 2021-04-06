import { FunctionComponent, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Loading } from "../common/Loading";

export const Logout: FunctionComponent<{keyId: string;}> = ({keyId}) => {
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