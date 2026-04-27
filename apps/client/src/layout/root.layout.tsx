import { Outlet } from 'react-router-dom';
import RootNavbar from '../components/common/navbar/root-navbar/root-navbar.component.tsx';

export default function RootLayout() {

  return (
    <main>
      <RootNavbar />

      <div className="container mx-auto">
        <Outlet />
      </div>
    </main>
  );
}