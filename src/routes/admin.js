import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminLayout from '../admin-layout';
import Dashboard from '../container/admin/dashboard';
import Products from '../container/admin/products';
import Orders from '../container/admin/orders';
import OrderDetails from '../container/admin/order-details';

const AdminRoutes = () => {
  const { isAdmin } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.token) {
    if (isAdmin) {
      return (
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-details" element={<OrderDetails />} />
          </Routes>
        </AdminLayout>
      );
    }
    navigate('/user');
  }

  navigate('/auth');
  return null;
};

export default AdminRoutes;
