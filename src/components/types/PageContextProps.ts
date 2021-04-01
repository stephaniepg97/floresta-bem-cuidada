import { _Document } from "../models/Document";
import { PageProps } from "./PageProps";
import { RouteComponentProps } from "./RouteComponentProps";
import { RouteComponentProps as RP } from "react-router";

export type PageContextProps = RouteComponentProps & PageProps & RP;