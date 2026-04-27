import useAuth from './useAuth.ts';
import { axiosPrivateInstance } from '../../api/api.ts';
import { UserCredentials } from '../../context/AuthProvider.tsx';

const useLogout = () => {
  const { setAuth } = useAuth();

  return async () => {
    setAuth({} as UserCredentials);
    try {
      await axiosPrivateInstance.post('/auth/signout', {}, { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
  };
};

export default useLogout;