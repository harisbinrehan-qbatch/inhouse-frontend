/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import CustomForm from '../../../components/input';
import Arrow from '../../../assets/images/Arrow-up-down.svg';
import sideArrow from '../../../assets/images/Arrow up right.svg';
import {
  fetchAllOrders, getAdminOrderStats, setOrderAsDelivered, startAgendaJobs,
} from '../../../redux/slices/order';
import CustomAlert from '../../../components/alert';

import './style.css';
import OrdersRectangle from '../../../components/admin-orders-rectangle/admin-orders-rectangle';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, ordersError, adminOrderStats } = useSelector(
    (state) => state.order,
  );

  const handleSetMarkAsDelivered = (orderId) => {
    dispatch(setOrderAsDelivered(orderId))
      .then(() => {
        dispatch(fetchAllOrders());
      })
      .catch((error) => {
        console.error('Error marking order as delivered:', error);
      });
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  useEffect(() => {
    dispatch(getAdminOrderStats());
  }, []);

  const handleSearch = debounce((e) => {
    dispatch(fetchAllOrders(e.target.value));
  }, 500);

  useEffect(() => {
    dispatch(startAgendaJobs());
  }, []);

  return (
    <div className="orders-main-div">
      <h2 className="heading d-flex p-4">Orders</h2>
      <div className="d-flex justify-content-around ps-3 pe-3">
        <OrdersRectangle
          rectangleText="Total orders: "
          value={adminOrderStats.totalOrders || 0}
        />
        <OrdersRectangle
          rectangleText="Total units: "
          value={adminOrderStats.totalUnits}
        />
        <OrdersRectangle
          rectangleText="Total amount: "
          value={adminOrderStats.totalAmount}
          here
          append
          dollar
          sign
        />
      </div>
      <div>
        <div className="table-body w-100 h-100 p-4">
          <div className="header-buttons">
            <b className="fs-5 mt-2">Search :</b>
            <CustomForm
              style={{ marginTop: '-20px' }}
              placeholder="Search by id"
              className="mx-3"
              onChange={handleSearch}
            />
          </div>
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
              {orders?.map((order) => (
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
                        className="pt-1 mark-delivered-arrow"
                        style={{ cursor: 'pointer' }}
                        onClick={() => { handleSetMarkAsDelivered(order._id); }}
                      />
                      {order.isDelivered ? (
                        <div className="d-flex pt-1 ms-4 mark-delivered-div">
                          Delivered
                        </div>
                      ) : (
                        <div className="pt-1 ms-4 mark-as-delivered-div">
                          Mark as Delivered
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {ordersError && (
            <div>
              <CustomAlert variant="danger" alertText="Error" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;