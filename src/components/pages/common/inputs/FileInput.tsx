import { IonInput } from "@ionic/react";
import { Model } from "../../../models/Model";
import { Button } from "../buttons/Button";
import { attach } from 'ionicons/icons';
import { createRef, useRef } from "react";
import { FormState } from "../../../types/FormProps";
import './FileInput.scss'

export const FileInput = <T extends Model> ({model, ...props}: React.ComponentProps<typeof IonInput> & FormState<T>) => {
    const fileInput =  createRef<HTMLInputElement>(), 
        textInput = createRef<HTMLIonInputElement>(), 
        base64 = useRef<string | null>(null);
    return (
        <>
            <IonInput ref={textInput} {...props} onIonChange={event => {
                event.detail.value = `${event.detail.value},${base64.current}`;
                props.onIonChange && props.onIonChange(event);
            }} readonly />
            <Button 
                text="Anexar"
                button={{
                    color: "medium",
                    onClick: () => fileInput.current?.click(), //model,
                }}
                label={{color: "white"}}
                icon={{
                    icon: attach,
                    color: "white",
                }}
            />
            <input type="file" ref={fileInput} onChange={event => {
                if (!textInput.current || !event.target.files) return;
                let files = event.target.files;
                if (!files.length) return;
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(files[0]);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                }).then(value => {
                    base64.current = String(value).split(",")[1];
                    if (!!textInput.current) textInput.current.value = files[0].name;
                })
            }} />
        </>
    );
}