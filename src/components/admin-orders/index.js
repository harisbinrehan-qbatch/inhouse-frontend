import OrdersRectangle from './admin-orders-rectangle';
import Products from '../admin-products';
import './style.css';

const Orders = () => (
  <div className="orders-main-div">
    <h2 className="dashboard-header d-flex p-4">Orders</h2>
    <div className="d-flex justify-content-around ps-3 pe-3">
      <OrdersRectangle rectangleText="Total orders: " value={10} />
      <OrdersRectangle rectangleText="Total units: " value={45} />
      <OrdersRectangle rectangleText="Total amount: " value={`$${10000}`} />
    </div>
    <div className="">
      <Products />
    </div>
  </div>
);

export default Orders;
