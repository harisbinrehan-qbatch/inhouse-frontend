import { useSelector } from 'react-redux';
import UserModuleHeader from '../../components/user-module-heading';
import UserProducts from '../../components/user-products';
import UserProductsDisplay from '../../components/user-products-display';

import './style.css';

function UserMainPage() {
  const products = useSelector((state) => state.products.data);
  return (
    <div className={products.length !== 0 && 'user-main-page'}>
      {products.length !== 0 ? <UserModuleHeader /> : null}
      <div className="d-flex">
        <div className="scrollable-section">
          <UserProducts />
        </div>
        <UserProductsDisplay />
      </div>
    </div>
  );
}
export default UserMainPage;
