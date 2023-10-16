import CustomNavbar from '../components/navbar';
import UserProducts from '../components/user-products';
import UserProductsDisplay from '../components/user-products-display';
import './style.css';

const UserLayout = ({ children, setIsLoggedIn }) => (
  <div className="user-layout">
    <div className="sticky-section">
      <CustomNavbar
        name="Haris Bin Rehan"
        userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
    <div className="content-section ">
      {children}
      <div className="d-flex">
        <div className="d-flex">
          <div className="scrollable-section">
            <UserProducts />
          </div>
          <UserProductsDisplay />
        </div>
      </div>
    </div>
  </div>
);

export default UserLayout;
