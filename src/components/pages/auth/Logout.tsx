import { FunctionComponent, useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AppContext } from "../../contexts/AppContext";
import { Loading } from "../common/Loading";

const Logout: FunctionComponent<RouteComponentProps> = (props) => {
    useEffect(() => console.log(props), [props])
    const [loading, setLoading] = useState(true);
    const appContext = useContext(AppContext);
    const logOut = useCallback(() => {
        setLoading(false)
    }, [setLoading]);
    useEffect(() => {
        appContext.logout(logOut);
    }, [appContext, logOut])
    return (
        <Loading key="logout" isOpen={loading} message="A terminar sessão..." />
    )
}
export default withRouter(Logout);