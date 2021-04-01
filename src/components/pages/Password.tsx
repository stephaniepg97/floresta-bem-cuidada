import React, { ComponentType } from 'react';
import { RouteComponentProps} from "react-router";
import { AppRouteProps } from '../types/AppRouteProps';
export const Password: ComponentType<RouteComponentProps & Pick<AppRouteProps, 'keyId'>> = props => <div key={props.keyId}></div>