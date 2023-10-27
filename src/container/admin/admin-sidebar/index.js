import SidebarRow from '../../../components/admin-sidebar-row/admin-sidebar-row';
import './style.css';

const CustomSidebar = () => (
  <div className="sidebar">
    <SidebarRow link="/dashboard" text="Dashboard" />
    <SidebarRow link="/products" text="Products" />
    <SidebarRow link="./orders" text="Orders" />
  </div>
);

export default CustomSidebar;
