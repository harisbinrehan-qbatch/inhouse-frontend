import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNotifications, getOrderStats, startAgendaJobs } from '../../redux/slices/order';
import DashboardCart from '../../components/dashboard-cart/admin-dashboard-cart';

import DashboardOrdersGraph from '../../components/dashboard-orders-graph/admin-dashboard-orders-graph';
import DashboardLineChart from '../../components/dashboard-line-chart/admin-dashboard-linechart';

import TopSelling from '../../components/admin-top-selling';

import './style.css';

const Dashboard = () => {
  const { orderStats } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getOrderStats());
    dispatch(startAgendaJobs());
  }, []);

  return (
    <div className="table-body dashboard-main-div">
      <h2 className="heading d-flex p-4">Dashboard</h2>
      <div className="d-flex justify-content-around gap-4 ms-4 me-3">
        <DashboardCart
          cartText="Today"
          totalOrders={orderStats?.todayStats?.totalOrders || '0'}
          totalUnits={orderStats?.todayStats?.totalUnits || '0'}
          totalSale={orderStats?.todayStats?.totalSales || '0'}
        />
        <DashboardCart
          cartText="7 Days"
          totalOrders={orderStats?.sevenDayStats?.totalOrders || '0'}
          totalUnits={orderStats?.sevenDayStats?.totalUnits || 'Nil'}
          totalSale={orderStats?.sevenDayStats?.totalSales || 'Nil'}
        />
        <DashboardCart
          cartText="30 Days"
          totalOrders={orderStats?.thirtyDayStats?.totalOrders || '0'}
          totalUnits={orderStats?.thirtyDayStats?.totalUnits || '0'}
          totalSale={orderStats?.thirtyDayStats?.totalSales || '0'}
        />
      </div>
      <div>
        <div className="d-flex pt-2">
          <div className="">
            <span className="p-3 m-3">Orders Overview</span>
            <div className="pt-3 ps-2">
              <DashboardOrdersGraph
                paidOrders={orderStats?.totalPaidOrders || 0}
                unpaidOrders={orderStats?.totalUnpaidOrders || 0}
              />
            </div>
          </div>
          <div className="ps-3">
            <span className="p-3 mb-3">Sales & Orders Report</span>
            <div className="pt-3">
              <DashboardLineChart
                oneYearStats={orderStats?.oneYearStats || {}}
              />
            </div>
          </div>
        </div>
        <div>
          <TopSelling />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
