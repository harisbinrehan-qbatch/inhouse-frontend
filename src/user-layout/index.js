import CustomNavbar from '../components/navbar';

import './style.css';

const UserLayout = ({ children, setIsLoggedIn }) => (
  <div className="">
    <div className="">
      <CustomNavbar
        name="Haris Bin Rehan"
        userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
    <div className="card-overlay">{children}</div>
  </div>
);

export default UserLayout;
