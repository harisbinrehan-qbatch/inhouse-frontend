/* eslint-disable react/no-array-index-key */
import { PieChart, Pie, Cell } from 'recharts';

import OrdersPaid from '../../assets/images/orders-paid.svg';
import OrdersUnpaid from '../../assets/images/orders-unpaid.svg';

const data = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F'];

const DashboardOrdersGraph = () => (
  <div className="dashboard-orders-graph-main-div ">
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        cx={120}
        cy={120}
        innerRadius={70}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    <div className="p-2 dashboard-orders-graph-text">
      <img src={OrdersPaid} alt="Orders Paid Icon" />
      <span className="m-2">Orders Paid</span>
      <img src={OrdersUnpaid} alt="Orders Unpaid Icon" />
      <span className="m-2">Orders Unpaid</span>
    </div>
  </div>
);

export default DashboardOrdersGraph;
