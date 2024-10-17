import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../stores/UserStore/userStore';

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
