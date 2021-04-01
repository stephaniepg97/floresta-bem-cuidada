import { IonInput } from "@ionic/react";
import { Model } from "../../../models/Model";
import { FormState } from "../../../types/FormProps";
import { Button } from "../buttons/Button";
import { attach } from 'ionicons/icons';
import './FileInput.scss'
import { createRef } from "react";

export const FileInput = <T extends Model> ({model, ...props}: React.ComponentProps<typeof IonInput> & FormState<T>) => {
    const fileInput = createRef<HTMLInputElement>(), textInput = createRef<HTMLIonInputElement>();
    return (
        <>
            <IonInput ref={textInput} {...props} readonly />
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
            <input ref={fileInput} type="file" onChange={event => {
                if (!textInput.current || !event.target.files) return;
                let input = textInput.current, files = event.target.files;
                input.value = files[0].name;
                model = {...model, [props.name as keyof T]: files[0].name}
            }} />
        </>
    );
}