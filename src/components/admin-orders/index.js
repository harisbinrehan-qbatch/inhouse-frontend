import React from 'react';
import { Table } from 'react-bootstrap';
import './style.css';
import CustomForm from '../input';
import Arrow from '../../assets/images/Arrow-up-down.svg';
import OrdersRectangle from './admin-orders-rectangle';
import sideArrow from '../../assets/images/Arrow up right.svg';

const Orders = () => (
  <div className="orders-main-div">
    <h2 className="heading d-flex p-4">Orders</h2>
    <div className="d-flex justify-content-around ps-3 pe-3">
      <OrdersRectangle rectangleText="Total orders: " value={10} />
      <OrdersRectangle rectangleText="Total units: " value={45} />
      <OrdersRectangle rectangleText="Total amount: " value={`$${10000}`} />
    </div>
    <div>
      <div className="table-body w-100 h-100 p-4">
        <div className="header-buttons">
          <b className="fs-5 mt-2">Search :</b>
          <CustomForm
            style={{ marginTop: '-20px' }}
            placeholder="Search by id"
            className="mx-3"
            // onChange={handleSearch}
          />
        </div>
        <Table>
          <thead>
            <tr className="table-secondary mt-3">
              <th>
                Date
                <img src={Arrow} alt="Arrow Icon" className="ps-2" />
              </th>
              <th>Order</th>
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
            <tr>
              <td className="pt-2">21 July 1999</td>
              <td className="pt-2" style={{ fontWeight: 'bold' }}>
                562652432
              </td>

              <td className="pt-2">Haris Bin Rehan</td>
              <td className="pt-2 ps-4">786</td>
              <td className="pt-2 ps-3">Rs.999</td>
              <td className="pt-2 ps-2">
                <div className="row-paid-div">Paid</div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <img
                    src={sideArrow}
                    alt="arrow"
                    className="pt-1 mark-delivered-arrow"
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="pt-1 ms-4 mark-delivered-div">
                    Mark as Delivered
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="pt-2">21 July 1999</td>
              <td className="pt-2" style={{ fontWeight: 'bold' }}>
                562652432
              </td>

              <td className="pt-2">Haris Bin Rehan</td>
              <td className="pt-2 ps-4">786</td>
              <td className="pt-2 ps-3">Rs.999</td>
              <td className="pt-2 ps-2">
                <div className="row-paid-div">Paid</div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <img
                    src={sideArrow}
                    alt="arrow"
                    className="pt-1 mark-delivered-arrow"
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="pt-1 ms-4 mark-delivered-div">
                    Mark as Delivered
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="pt-2">21 July 1999</td>
              <td className="pt-2" style={{ fontWeight: 'bold' }}>
                562652432
              </td>

              <td className="pt-2">Haris Bin Rehan</td>
              <td className="pt-2 ps-4">786</td>
              <td className="pt-2 ps-3">Rs.999</td>
              <td className="pt-2 ps-2">
                <div className="row-paid-div">Paid</div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <img
                    src={sideArrow}
                    alt="arrow"
                    className="pt-1 mark-delivered-arrow"
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="pt-1 ms-4 mark-delivered-div">
                    Mark as Delivered
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="pt-2">21 July 1999</td>
              <td className="pt-2" style={{ fontWeight: 'bold' }}>
                562652432
              </td>

              <td className="pt-2">Haris Bin Rehan</td>
              <td className="pt-2 ps-4">786</td>
              <td className="pt-2 ps-3">Rs.999</td>
              <td className="pt-2 ps-2">
                <div className="row-paid-div">Paid</div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <img
                    src={sideArrow}
                    alt="arrow"
                    className="pt-1 mark-delivered-arrow"
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="pt-1 ms-4 mark-delivered-div">
                    Mark as Delivered
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="pt-2">21 July 1999</td>
              <td className="pt-2" style={{ fontWeight: 'bold' }}>
                562652432
              </td>

              <td className="pt-2">Haris Bin Rehan</td>
              <td className="pt-2 ps-4">786</td>
              <td className="pt-2 ps-3">Rs.999</td>
              <td className="pt-2 ps-2">
                <div className="row-paid-div">Paid</div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <img
                    src={sideArrow}
                    alt="arrow"
                    className="pt-1 mark-delivered-arrow"
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="pt-1 ms-4 mark-delivered-div">
                    Mark as Delivered
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  </div>
);

export default Orders;
