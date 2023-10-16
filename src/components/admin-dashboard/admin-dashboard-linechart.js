import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import OrdersPaid from '../../assets/images/orders-paid.svg';
import OrdersUnpaid from '../../assets/images/orders-unpaid.svg';
import './style.css';

const data = [
  {
    name: 'Jan',
    orders: 4000,
    sales: 2400,
  },
  {
    name: 'Feb',
    orders: 3000,
    sales: 1398,
  },
  {
    name: 'Mar',
    orders: 2000,
    sales: 9800,
  },
  {
    name: 'Apr',
    orders: 2780,
    sales: 3908,
  },
  {
    name: 'May',
    orders: 1890,
    sales: 4800,
  },
  {
    name: 'Jun',
    orders: 2390,
    sales: 3800,
  },
  {
    name: 'Jul',
    orders: 3490,
    sales: 4300,
  },
  {
    name: 'Aug',
    orders: 3000,
    sales: 1398,
  },
  {
    name: 'Sep',
    orders: 2000,
    sales: 9800,
  },
  {
    name: 'Oct',
    orders: 2780,
    sales: 3908,
  },
  {
    name: 'Nov',
    orders: 1890,
    sales: 4800,
  },
  {
    name: 'Dec',
    orders: 2780,
    sales: 3908,
  },
];

export default function DashboardLineChart() {
  return (
    <div className="dashboard-line-chart-main-div">
      <div className="p-4 dashboard-line-chart-text">
        <img src={OrdersPaid} alt="Orders Paid Icon" />
        <span className="m-2">Orders Paid</span>
        <img src={OrdersUnpaid} alt="Orders Unpaid Icon" />
        <span className="m-2">Orders Unpaid</span>
      </div>
      <LineChart
        width={717}
        height={218}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="sales"
          stroke="rgba(0, 123, 255, 1)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="orders"
          stroke="rgba(230, 86, 0, 1)"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
      </LineChart>
    </div>
  );
}
