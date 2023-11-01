import { useLocation } from 'react-router';
import CustomNavbar from '../components/navbar';

import './style.css';

const UserLayout = ({ children, setIsLoggedIn }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      {pathname !== '/userOrders' ? (
        <>
          <div className="">
            <CustomNavbar
              name="Haris Bin Rehan"
              userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
          <div className="card-overlay">{children}</div>

        </>
      ) : (
        <div className="card-overlay">{children}</div>
      )}
    </div>
  );
};

export default UserLayout;
