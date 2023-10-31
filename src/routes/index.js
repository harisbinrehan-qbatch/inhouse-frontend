import {
  Route, Routes, useNavigate, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import Login from '../container/auth/login';
import Signup from '../container/auth/signup';
import ForgotPassword from '../container/auth/forgot-password';
import NewPassword from '../container/auth/new-password';
import AdminLayout from '../admin-layout';
import UserLayout from '../user-layout';
import MainPageLayout from '../main-page-layout';
import Dashboard from '../container/admin/admin-dashboard';
import Products from '../container/admin/admin-products';
import Orders from '../container/admin/admin-orders';
import UserMainPage from '../container/user/user-main-page';
import UserCart from '../container/user/user-cart';
import OrderDetails from '../container/admin/admin-order-details';

const CustomRoutes = () => {
  const { isAdmin, loginError } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user'));

  const { pathname } = location;

  useEffect(() => {
    if (!loginError && pathname === '/login') {
      navigate('/');
    }
  }, [loginError]);

  if (user?.token) {
    if (isAdmin) {
      return (
        <AdminLayout>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orderDetails" element={<OrderDetails />} />
            orderDetails
          </Routes>
        </AdminLayout>
      );
    }
    return (
      <UserLayout>
        <Routes>
          <Route path="" element={<UserMainPage />} />
          <Route path="/shopping-bag" element={<UserCart />} />
        </Routes>
      </UserLayout>
    );
  }
  return (
    <MainPageLayout>
      <Routes>
        <Route path="" element={<UserMainPage />} />
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
      </Routes>
    </MainPageLayout>
  );
};

export default CustomRoutes;
