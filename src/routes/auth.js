import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';

import Login from '../container/auth/login';
import Signup from '../container/auth/signup';
import ForgotPassword from '../container/auth/forgot-password';
import NewPassword from '../container/auth/new-password';

import MainPageLayout from '../main-page-layout';

const AuthRoutes = () => {
  const { loginError } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  useEffect(() => {
    if (!loginError && pathname === '/auth/login') {
      navigate('/');
    }
  }, [loginError]);

  return (
    <MainPageLayout>
      <Routes>
        <Route path="/login" element={<Login header="Login" />} />
        <Route path="/signup" element={<Signup header="Sign Up" />} />
        <Route
          path="/newPassword"
          element={<NewPassword header="New Password" />}
        />
        <Route
          path="/forgotPassword"
          element={<ForgotPassword header="Forgot Password" />}
        />
        <Route
          path="*"
          element={<div className="empty-state-page">Page Not Found</div>}
        />
      </Routes>
    </MainPageLayout>
  );
};

export default AuthRoutes;
