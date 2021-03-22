import React, { FC } from 'react';
import { AppContextProps } from '../types/AppContextProps';
import { RouteComponentProps } from '../types/RouteComponentProps';
import {
    RouteComponentProps as RP
  } from "react-router";

export const Home: FC<RouteComponentProps & AppContextProps & RP<any>> = () => <></>