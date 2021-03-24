import React, { FC } from 'react';
import { RouteComponentProps } from '../types/RouteComponentProps';
import {
    RouteComponentProps as RP
  } from "react-router";

export const Password: FC<RouteComponentProps & RP<any>> = props => <div key={props.keyId}></div>