import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Products from '../components/admin-products';
import Login from '../container/auth/login';
import Signup from '../container/auth/signup';
import ForgotPassword from '../container/auth/forgot-password';
import NewPassword from '../container/auth/new-password';
import Orders from '../components/admin-orders';
import Dashboard from '../components/admin-dashboard';
import AdminLayout from '../admin-layout';
import UserLayout from '../user-layout';
import UserModuleHeader from '../components/user-module-heading';

const CustomRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { isAdmin } = useSelector((state) => state.authentication);

  if (user?.token) {
    if (isAdmin) {
      return (
        <AdminLayout>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </AdminLayout>
      );
    }
    return (
      <UserLayout>
        <Routes>
          <Route index element={<UserModuleHeader />} />
        </Routes>
      </UserLayout>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Login header="Login" />} />
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
  );
};
export default CustomRoutes;
