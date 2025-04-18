import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - home
const Home = Loadable(lazy(() => import('pages/home')));
const Profiles = Loadable(lazy(() => import('pages/profiles')));
const Profile = Loadable(lazy(() => import('pages/profile')));
const ProfileForm = Loadable(lazy(() => import('pages/authentication/Profile')));
const MyProfile = Loadable(lazy(() => import('pages/authentication/MyProfile')));

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
      path: '/:citySlug',
      element: <Profiles />,
    },
    {
      path: 'profile/add',
      element: <ProfileForm />,
    },
    {
      path: 'profile/me',
      element: <MyProfile />,
    },
    {
      path: '/:citySlug/:id',
      element: <Profile />,
    },
  ],
};

export default MainRoutes;
