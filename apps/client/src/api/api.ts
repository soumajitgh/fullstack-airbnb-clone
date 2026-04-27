import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosParams: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
};

export const axiosInstance: AxiosInstance = axios.create(axiosParams);

export const axiosPrivateInstance: AxiosInstance = axios.create({ withCredentials: true, ...axiosParams });
