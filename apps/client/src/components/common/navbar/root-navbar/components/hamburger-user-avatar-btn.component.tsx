import { Link } from 'react-router-dom';
import LogoutButton from '../../../auth/LogoutButton.component.tsx';

export default function HamburgerUserAvatarBtn() {
  return (
    <details className="dropdown dropdown-end">
      <summary
        className="btn border-base-300 p-2 flex gap-2 text-2xl rounded-full bg-base-100 hover:bg-base-100 hover:shadow-xl text-base-300 border-2 m-1">
        <span className="material-symbols-rounded">menu</span>
        <span className="material-symbols-rounded">account_circle</span>
      </summary>

      <ul className="menu dropdown-content bg-base-100 border-2 flex gap-2 rounded-box z-[1] w-52 p-2 shadow">
        <li><Link to={'/hosting/reservations'}>Manage listings</Link></li>
        <li><Link to={'/my-bookings'}>My bookings</Link></li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </details>

  );
};