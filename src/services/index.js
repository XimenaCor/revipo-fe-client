/* eslint-disable import/no-anonymous-default-export */
import Axios, { AxiosRequestConfig } from 'axios';
import Solicitud from './solicitud';

const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/api`,
});

export default {
  axios,
  solicitud: new Solicitud(axios)
};