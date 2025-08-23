import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../provider/authProvider';

export const Logout = () => {
  const { setAccessToken: setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setToken(null);
    await navigate('/', { replace: true });
  };

  return (
    <div>
      <h1 className="p-4">Logout</h1>
      <button
        onClick={() => {
          void handleLogout();
        }}>
        Logout
      </button>
    </div>
  );
};
