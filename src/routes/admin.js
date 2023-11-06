import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLayout from '../admin-layout';
import Dashboard from '../container/admin/dashboard';
import Products from '../container/admin/products';
import Orders from '../container/admin/orders';
import OrderDetails from '../container/admin/order-details';

const AdminRoutes = () => (
  <AdminLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-details" element={<OrderDetails />} />
      <Route
        path="*"
        element={<div className="empty-state-page">Page Not Found</div>}
      />
    </Routes>
  </AdminLayout>
);

export default AdminRoutes;
