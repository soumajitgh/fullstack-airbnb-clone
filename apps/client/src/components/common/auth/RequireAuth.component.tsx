import useAuth from '../../../hooks/auth/useAuth.ts';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuthComponent = () => {
  const authContext = useAuth();
  const location = useLocation();

  return (
    authContext?.auth?.accessToken
      ? <Outlet />
      : <Navigate to={'/auth/login'} state={{ from: location }} replace />
  );
};

export default RequireAuthComponent;