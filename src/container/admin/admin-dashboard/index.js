import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DashboardCart from './admin-dashboard-cart';
import DashboardLineChart from './admin-dashboard-linechart';
import DashboardOrdersGraph from './admin-dashboard-orders-graph';
import Products from '../admin-products';

import './style.css';
import { getOrderStats } from '../../../redux/slices/order';

const Dashboard = () => {
  const { orderStats } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderStats());
  }, []);

  return (
    <div className="dashboard-main-div">
      <h2 className="heading d-flex p-4">Dashboard</h2>
      <div className="d-flex justify-content-around gap-4 ms-4 me-3">
        <DashboardCart
          cartText="Today"
          totalOrders={orderStats?.todayStats?.totalOrders}
          totalUnits={orderStats?.todayStats?.totalUnits}
          totalSale={orderStats?.todayStats?.totalSales}
        />
        <DashboardCart
          cartText="7 Days"
          totalOrders={orderStats?.sevenDayStats?.totalOrders}
          totalUnits={orderStats?.sevenDayStats?.totalUnits}
          totalSale={orderStats?.sevenDayStats?.totalSales}
        />
        <DashboardCart
          cartText="30 Days"
          totalOrders={orderStats?.thirtyDayStats?.totalOrders}
          totalUnits={orderStats?.thirtyDayStats?.totalUnits}
          totalSale={orderStats?.thirtyDayStats?.totalSales}
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
};

export default Dashboard;
