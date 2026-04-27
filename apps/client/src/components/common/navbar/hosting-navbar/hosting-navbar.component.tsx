import HamburgerUserAvatarBtn from '../root-navbar/components/hamburger-user-avatar-btn.component.tsx';
import { Link } from 'react-router-dom';
import NavbarLogo from '../navbar-logo.component.tsx';

export default function HostingNavbar() {

  return (
    <>
      <nav className="navbar container mx-auto my-2">
        <div className="navbar-start">
          <NavbarLogo />
        </div>

        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-md font-semibold gap-2 text-gray-500">
            <li><Link to={'/hosting/reservations'}>Reservations</Link></li>
            <li><Link to={'/hosting/listings'}>Listings</Link></li>
            <li><Link to={'/hosting/become-a-host'}>New Listing</Link></li>
          </ul>
        </div>

        <div className="navbar-end">
          <HamburgerUserAvatarBtn />
        </div>
      </nav>
      <div className="divider my-0" />
    </>
  );
}