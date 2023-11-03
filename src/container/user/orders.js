/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Table } from 'react-bootstrap';
import Arrow from '../../assets/images/Arrow-up-down.svg';
import arrowLeft from '../../assets/images/Arrow left.svg';
import sideArrow from '../../assets/images/Arrow up right.svg';
import { setUserOrderDetailsShow } from '../../redux/slices/cart';
import UserOrderDetailsCanvas from '../../components/user-order-details';

function UserOrders() {
  const location = useLocation();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get('userId');

  const { orders } = useSelector((state) => state.order);

  const { userOrderDetailsShow } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const userOrders = orders.filter((order) => order.userId === userId);

  if (userOrders.length === 0) {
    return <div>No orders found for this user.</div>;
  }

  const handleOrderDetailsCanvas = (order) => {
    setSelectedOrder(order);
    dispatch(setUserOrderDetailsShow());
  };

  return (
    <div>
      <div className="d-flex p-4">
        <Link to="/">
          <img src={arrowLeft} alt="Cloud" className="img-large" />
        </Link>
        <h2 className="d-flex ps-3 pt-1">Orders</h2>
      </div>
      <div className="container">
        <Table>
          <thead>
            <tr className="table-secondary mt-3">
              <th>
                Date
                <img src={Arrow} alt="Arrow Icon" className="ps-2" />
              </th>
              <th>Order #</th>
              <th>User</th>
              <th>
                Products
                <img src={Arrow} alt="Arrow Icon" className="ps-1" />
              </th>
              <th>
                Amount
                <img src={Arrow} alt="Arrow Icon" className="ps-1" />
              </th>
              <th>
                Status
                <img src={Arrow} alt="Arrow Icon" className="ps-1" />
              </th>
              <th className="ps-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {userOrders.map((order) => (
              <tr key={order._id}>
                <td className="pt-2">
                  {new Date(order.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td className="pt-2" style={{ fontWeight: 'bold' }}>
                  {order.orderId}
                </td>
                <td className="pt-2">{order.username}</td>
                <td className="pt-2 ps-4">{order.products.length}</td>
                <td className="pt-2 ps-3">{order.total}</td>
                <td>
                  {order.isPaid ? (
                    <div className="row-paid-div">Paid</div>
                  ) : (
                    <div className="row-unpaid-div">Unpaid</div>
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-end">
                    <img
                      src={sideArrow}
                      alt="arrow"
                      className="d-flex pt-1 mark-delivered-arrow pe-5"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleOrderDetailsCanvas(order)} // Fixed the onClick handler
                    />
                  </div>
                </td>
              </tr>
            ))}
            {userOrderDetailsShow && (
              <UserOrderDetailsCanvas orderData={selectedOrder} />
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserOrders;
