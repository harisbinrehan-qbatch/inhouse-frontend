// import { Route, Routes } from 'react-router-dom';
import CustomSidebar from '../container/admin/admin-sidebar';
import CustomNavbar from '../components/navbar';

const AdminLayout = ({ children, setIsLoggedIn }) => (
  <div>
    <CustomNavbar
      name="Haris Bin Rehan"
      userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
      setIsLoggedIn={setIsLoggedIn}
    />
    <div className="d-flex">
      <CustomSidebar />
      <div className=" w-100 p-4">{children}</div>
    </div>
  </div>
);
export default AdminLayout;
