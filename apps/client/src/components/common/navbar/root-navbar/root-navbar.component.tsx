import RootNavbarSearch from './components/root-navbar-search.component.tsx';
import HamburgerUserAvatarBtn from './components/hamburger-user-avatar-btn.component.tsx';
import NavbarLogo from '../navbar-logo.component.tsx';

export default function RootNavbar() {
  return (
    <>
      <nav className="navbar container mx-auto my-2">
        <div className="navbar-start">
          <NavbarLogo />
        </div>

        <div className="navbar-center">
          <RootNavbarSearch />
        </div>

        <div className="navbar-end">
          <HamburgerUserAvatarBtn />
        </div>
      </nav>

      <div className="divider" />
    </>
  );
}