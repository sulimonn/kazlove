import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - home
const Home = Loadable(lazy(() => import('pages/home')));
const Profile = Loadable(lazy(() => import('pages/profile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/profile/:id',
      element: <Profile />,
    },
  ],
};

export default MainRoutes;
