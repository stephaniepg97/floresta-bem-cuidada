import {  useState, FunctionComponent, useContext, useEffect } from 'react';
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import "./Login.scss";
import {
    IonContent,
    IonImg,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonFooter,
    IonToolbar,
    IonPage,
    IonTitle,
} from '@ionic/react';
import { Loading } from "../common/Loading";
import logo from "../../../assets/img/logo74.png";
import { User } from '../../models/User';

import config from "../../../config.json";
import { AppContext } from '../../contexts/AppContext';
import { RouteComponentProps, withRouter } from 'react-router';
import { useDialog } from '../../hooks/Dialog';

type FormData = Pick<User, 'Username' | 'Password'>
const Login: FunctionComponent<RouteComponentProps> = ({history}) => {
    const { login, token, setToken } = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const { Dialog, showDialog } = useDialog(setShowLoading);
    const { handleSubmit, errors, getValues, control } = useForm<FormData>();
    const submit = handleSubmit(data => {
        setShowLoading(true)
        login({logIn: () => setShowLoading(false), ...data, ...config})
            .then(([_token, result]) => {
                if (result?.status) setToken(_token);
                else if (!!result) showDialog(result)
            })
    });
    const fields: Array<{name: keyof FormData, title: string, options?: RegisterOptions}> = [{
        name: "Username",
        title: "Utilizador",
        options: {
            required: "Introduza um nome de utilizador/email válido.",
        }
    }, {
        name: "Password",
        title: "Senha",
        options: {
            required: "Introduza a palavra passe.",
        }
    }];
    useEffect(() => {
        if (token) history.push("/encomendas/all")
    }, [history, token])
    return (
        <>
        <Dialog />
        <IonPage key="login">
            <Loading isOpen={showLoading} />
            <IonContent>
                <div id="loginVerticalAlign" slot="fixed">
                    <div>
                        <IonImg alt="loginLogo" id="loginLogo" src={logo} />
                        <IonTitle size="small">Portal do colaborador</IonTitle>
                    </div>
                    <div className="margin-top-4x">
                        <div className="ion-text-center" id="loginTitle">Login</div>
                    </div>
                    <div className="loginFormWrapper margin-top-4x">
                        <form autoComplete="on">
                            <IonList className="ion-margin">
                                {fields.map((field, index) => (
                                    <div key={index}>
                                        <IonItem>
                                            <Controller
                                                render={({value, onChange, name}) => (
                                                    <IonInput 
                                                        {...field.name === "Username"
                                                            ? { autocomplete: "username", type: "text" }
                                                            : { type: "password", onKeyPress: (event) => event.key.toLowerCase() === "enter" && submit()}
                                                        }
                                                        onIonChange={onChange}
                                                        name={name}
                                                        value={value}   
                                                        placeholder={field.title}
                                                        clearOnEdit={false}
                                                    />
                                                )}
                                                name={field.name}
                                                value={""}
                                                defaultValue={getValues()[field.name] ?? ""}
                                                rules={field.options}
                                                control={control}
                                            />
                                        </IonItem> 
                                        {errors[field.name] &&
                                            <div className="invalid-feedback">
                                                {errors[field.name]?.message}
                                            </div>
                                        }
                                    </div>
                                ))}
                            </IonList>
                            <IonButton
                                type="button"
                                expand="block" 
                                className="ion-text-uppercase ion-margin margin-top-4x"
                                color="primary"
                                onClick={submit}>
                                Entrar
                            </IonButton>
                        </form>
                    </div>
                </div>
            </IonContent>
            <IonFooter id="loginFooter" className="ion-no-border">
                <IonToolbar >
                    <p className="ion-text-center">FLORESTA BEM CUIDADA© | Todos os direitos reservados.</p>
                </IonToolbar>
            </IonFooter>
        </IonPage>
        </>
    );
};
export default withRouter(Login);