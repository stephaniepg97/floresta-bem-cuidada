import React, {  useState, ComponentType } from 'react';
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { RouteComponentProps as RP } from "react-router";
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
import { LoginProps } from "../../types/LoginProps";
import logo from "../../../assets/img/logo75.png";
import { AppContextProps } from '../../types/AppContextProps';

type FormData = {
    username: string;
    password: string;
};
export const Login: ComponentType<LoginProps & AppContextProps & RP<any>> = ({
    login,
    me,
    ...props
}) => {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const { handleSubmit, errors, getValues, control } = useForm<FormData>();
    const submit = handleSubmit(data => {
        setShowLoading(true)
        login(data).then(result => {
            setShowLoading(false);
            result.response && props.history.push("/encomendas/all")
        });
    });
    const fields: Array<{name: keyof FormData, title: string, options?: RegisterOptions}> = [{
        name: "username",
        title: "Utilizador",
        options: {
            required: "Introduza um nome de utilizador/email válido.",
        }
    }, {
        name: "password",
        title: "Senha",
        options: {
            required: "Introduza a palavra passe.",
        }
    }];
    return (
        <IonPage>
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
                                                        {...field.name === "username"
                                                            ? { autocomplete: "username", type: "text" }
                                                            : { type: "password", onKeyPress: (event) => event.key.toLowerCase() === "enter" && submit()}
                                                        }
                                                        onIonChange={(event) => {
                                                            onChange(event)
                                                            console.log(field.name, getValues()[field.name])
                                                        }}
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
                    <p className="ion-text-center">CORKART© | Todos os direitos reservados.</p>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};