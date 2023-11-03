import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './style.css';
import { fetchAllOrders } from '../../redux/slices/order';
import UserModuleHeader from '../../components/user-module-heading';
import UserProducts from '../../components/user-products';
import UserProductsDisplay from '../../components/user-products-display';

function UserMainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  });

  return (
    <div className="user-main-page">
      <UserModuleHeader />
      <div className="d-flex">
        <div className="d-flex">
          <div className="scrollable-section">
            <UserProducts />
          </div>
          <UserProductsDisplay />
        </div>
      </div>
    </div>
  );
}
export default UserMainPage;
