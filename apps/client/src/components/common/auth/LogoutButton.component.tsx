import useLogout from '../../../hooks/auth/useLogout.ts';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handelClick = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <button onClick={handelClick}>Logout</button>
  );
};