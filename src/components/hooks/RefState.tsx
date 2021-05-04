import { MutableRefObject, useRef } from "react";
import { Model } from "../models/Model";

export const useRefState = <T extends Model> () => {
    const model = useRef<T>({} as T), setModel = (newModel: T) => model.current = newModel, refState: [MutableRefObject<T>, (newModel: T) => T] = [model, setModel];
    return refState;
}