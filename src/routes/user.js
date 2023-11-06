import { Route, Routes } from 'react-router-dom';

import UserLayout from '../user-layout';
import UserMainPage from '../container/user/main-page';
import UserCart from '../container/user/cart';
import UserOrders from '../container/user/orders';

const UserRoutes = () => (
  <UserLayout>
    <Routes>
      <Route path="/" element={<UserMainPage />} />
      <Route path="/shopping-bag" element={<UserCart />} />
      <Route path="/user-orders" element={<UserOrders />} />
      <Route
        path="*"
        element={<div className="empty-state-page">Page Not Found</div>}
      />
    </Routes>
  </UserLayout>
);

export default UserRoutes;
