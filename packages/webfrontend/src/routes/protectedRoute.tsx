import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../provider/authProvider';

export const ProtectedRoute = () => {
  const { accessToken } = useAuth();

  // Check if the user is authenticated
  if (!accessToken) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
