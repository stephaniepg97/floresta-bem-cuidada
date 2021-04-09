import { IonItem, IonTitle } from '@ionic/react';
import { FunctionComponent, useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppContext } from '../contexts/AppContext';

const Password: FunctionComponent<RouteComponentProps> = (props) => {
    const {token} = useContext(AppContext);
    useEffect(() => {
        console.log(props)
        if (!token) return props.history.push("/login")
    }, [props, token])
    return (
        <IonItem>
            <IonTitle>Title</IonTitle>
        </IonItem>
    );
};
export default withRouter(Password);