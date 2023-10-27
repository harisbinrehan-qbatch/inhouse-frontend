import UserProducts from '../user-products';
import UserModuleHeader from '../user-module-heading';
import UserProductsDisplay from '../user-products-display';

import './style.css';

function UserMainPage() {
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
