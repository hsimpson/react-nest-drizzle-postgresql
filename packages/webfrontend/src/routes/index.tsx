import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { About } from '../pages/about';
import { Login } from '../pages/login';
import { Logout } from '../pages/logout';
import { useAuth } from '../provider/authProvider';
import { ProtectedRoute } from './protectedRoute';

const Routes = () => {
  const { accessToken } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: '/about',
      element: <About />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {},
        {
          path: '/profile',
          element: <div>User Profile</div>,
        },
        {
          path: '/logout',
          element: <Logout />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <div>Home Page</div>,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!accessToken ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
