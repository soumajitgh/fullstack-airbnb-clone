import { axiosPrivateInstance } from './api.ts';

const URLS = {
  signUpUsersUrl: 'auth/signUp',
  signInUsersUrl: 'auth/signIn',
  refreshAccessTokenUrl: 'auth/refresh',
};

export const signUpUser = (data: { email: string, password: string }) => {
  return axiosPrivateInstance.post(URLS.signUpUsersUrl, data);
};

export const signInUser = (data: { email: string, password: string }) => {
  return axiosPrivateInstance.post(URLS.signInUsersUrl, data, { withCredentials: true });
};

export const refreshAccessToken = () => {
  return axiosPrivateInstance.post(URLS.refreshAccessTokenUrl, { withCredentials: true });
};