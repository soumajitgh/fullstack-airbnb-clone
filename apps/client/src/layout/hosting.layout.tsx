import { Outlet } from 'react-router-dom';
import HostingNavbar from '../components/common/navbar/hosting-navbar/hosting-navbar.component.tsx';

export default function HostingRootLayout() {

  return (
    <main>
      <HostingNavbar />

      <div className="container mx-auto">
        <Outlet />
      </div>
    </main>
  );
}