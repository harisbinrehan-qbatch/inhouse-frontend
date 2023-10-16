import DashboardCart from './admin-dashboard-cart';
import DashboardLineChart from './admin-dashboard-linechart';
import DashboardOrdersGraph from './admin-dashboard-orders-graph';
import Products from '../admin-products';
import './style.css';

const Dashboard = () => (
  <div className="dashboard-main-div">
    <h2 className="dashboard-header d-flex p-4">Dashboard</h2>
    <div className="d-flex justify-content-around ps-4 pe-4">
      <DashboardCart
        cartText="Today"
        totalProducts="78"
        totalOrders="23"
        totalUnits="34"
        totalSale="Rs.1145"
      />
      <DashboardCart
        cartText="7 Days"
        totalProducts="78"
        totalOrders="23"
        totalUnits="34"
        totalSale="Rs.1145"
      />
      <DashboardCart
        cartText="30 Days"
        totalProducts="78"
        totalOrders="23"
        totalUnits="34"
        totalSale="Rs.1145"
      />
    </div>
    <div>
      <div className="d-flex pt-2">
        <div className="">
          <span className="p-3 m-3">Orders Overview</span>
          <div className="pt-3 ps-2">
            <DashboardOrdersGraph />
          </div>
        </div>
        <div className="ps-3">
          <span className="p-3 mb-3">Sales & Orders Report</span>
          <div className="pt-3">
            <DashboardLineChart />
          </div>
        </div>
      </div>
    </div>
    <div>
      <Products />
    </div>
  </div>
);

export default Dashboard;
