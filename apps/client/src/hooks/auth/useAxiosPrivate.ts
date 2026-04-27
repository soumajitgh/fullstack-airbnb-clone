import useRefreshToken from './useRefreshToken.ts';
import useAuth from './useAuth.ts';
import { axiosPrivateInstance } from '../../api/api.ts';
import { useEffect } from 'react';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }

        return config;
      }, (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        }

        return Promise.reject(error);
      });

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);


  return axiosPrivateInstance;
};

export default useAxiosPrivate;