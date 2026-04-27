import { createBrowserRouter } from 'react-router-dom';
import authRoute from './auth.route.tsx';
import RequireAuthComponent from '../components/common/auth/RequireAuth.component.tsx';
import AuthLayout from '../layout/auth.layout.tsx';
import PersistenceLogin from '../components/common/auth/PersistenceLogin.component.tsx';
import HostingRootLayout from '../layout/hosting.layout.tsx';
import hostingRoutes from './hosting.route.tsx';
import RootLayout from '../layout/root.layout.tsx';
import { guestRoutes } from './guest.route.tsx';
import ErrorView from '../views/error/error.view.tsx';


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoute,
  },
  {
    element: <PersistenceLogin />,
    errorElement: <ErrorView />,
    children: [
      {
        element: <RequireAuthComponent />,
        children: [
          {
            element: <RootLayout />,
            children: guestRoutes,
          },
          {
            path: 'hosting',
            element: <HostingRootLayout />,
            children: hostingRoutes,
          },
        ],
      },
    ],
  },
]);

export default router;