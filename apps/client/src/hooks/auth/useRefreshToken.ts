import useAuth from './useAuth.ts';
import { refreshAccessToken } from '../../api/auth.api.ts';

const useRefreshToken = () => {
  const authState = useAuth();

  return async () => {
    const response = await refreshAccessToken();

    authState?.setAuth((prev): { accessToken: string } => {

      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
};

export default useRefreshToken;