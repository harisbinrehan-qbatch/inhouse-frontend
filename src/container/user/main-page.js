import UserModuleHeader from '../../components/user-module-heading';
import UserProducts from '../../components/user-products';
import UserProductsDisplay from '../../components/user-products-display';

import './style.css';

function UserMainPage() {
  return (
    <div className="user-main-page">
      <UserModuleHeader />
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
