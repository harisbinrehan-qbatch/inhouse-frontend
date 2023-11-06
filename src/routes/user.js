import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserLayout from '../user-layout';
import UserMainPage from '../container/user/main-page';
import UserCart from '../container/user/cart';
import UserOrders from '../container/user/orders';

const UserRoutes = () => {
  const { isUser } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.token) {
    if (isUser) {
      return (
        <UserLayout>
          <Routes>
            <Route path="/" element={<UserMainPage />} />
            <Route path="/shopping-bag" element={<UserCart />} />
            <Route path="/user-orders" element={<UserOrders />} />
          </Routes>
        </UserLayout>
      );
    }
    navigate('/admin');
    return null;
  }
  navigate('/auth');
  return null;
};

export default UserRoutes;
