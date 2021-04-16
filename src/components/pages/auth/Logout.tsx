import { FunctionComponent, useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AppContext } from "../../contexts/AppContext";
import { Loading } from "../common/Loading";

const Logout: FunctionComponent<RouteComponentProps> = (props) => {
    useEffect(() => console.log(props), [props])
    const [loading, setLoading] = useState(true);
    const { logout } = useContext(AppContext);
    useEffect(() => {
        logout(() => setLoading(false)).then(() => props.history.push("login"));
    }, [logout, props.history])
    return (
        <Loading key="logout" isOpen={loading} message="A terminar sessão..." />
    )
}
export default withRouter(Logout);