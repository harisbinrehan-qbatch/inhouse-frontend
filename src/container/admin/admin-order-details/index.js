/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Table } from 'react-bootstrap';
import Arrow from '../../../assets/images/Arrow-up-down.svg';
import arrowLeft from '../../../assets/images/Arrow left.svg';

function OrderDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');

  const { orders } = useSelector((state) => state.order);

  const orderData = orders.find((order) => order._id === orderId);

  if (!orderData) {
    return <div>No order data found.</div>;
  }
  return (
    <div>
      <div className="d-flex">
        <Link to="/orders">
          <img src={arrowLeft} alt="Cloud" className="img-large" />
        </Link>
        <h2 className="d-flex ps-3 pt-1">Order Details</h2>
      </div>
      <div className="container d-flex mt-5 justify-content-between">
        <p>
          <strong style={{ color: 'green' }}>Date:</strong>
          {' '}
          <strong className="ps-1">
            {new Date(orderData.date).toLocaleString('en-US', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </strong>
        </p>
        <p>
          <strong style={{ color: 'green' }}>Order #:</strong>
          {' '}
          <strong className="ps-1">{orderData.orderId}</strong>
        </p>
        <p>
          <strong style={{ color: 'green' }}>User:</strong>
          {' '}
          <strong className="ps-1">{orderData.username}</strong>
        </p>
        <p>
          <strong style={{ color: 'green' }}>Products:</strong>
          {' '}
          <strong className="ps-1">{orderData.products.length}</strong>
        </p>
        <p>
          <strong style={{ color: 'green' }}>Amount:</strong>
          {' '}
          <strong className="ps-1">{orderData.total}</strong>
        </p>
        <p className="d-flex">
          <strong style={{ color: 'green' }}>Status:</strong>
          {' '}
          {orderData.isPaid ? (
            <div className="row-paid-div ms-2" style={{ marginTop: '-5px' }}>
              Paid
            </div>
          ) : (
            <div className="row-unpaid-div ms-2" style={{ marginTop: '-5px' }}>
              Unpaid
            </div>
          )}
        </p>
      </div>
      <div>
        <p>
          ____________________________________________________________________________________________________________________________________________________________________
        </p>
      </div>
      <div>
        <Table>
          <thead>
            <tr className="table-secondary mt-3">
              <th>Image</th>
              <th>
                Name
                <img src={Arrow} alt="Arrow Icon" className="ps-2" />
              </th>
              <th>Size</th>
              <th>Color</th>
              <th>
                Price
                <img src={Arrow} alt="Arrow Icon" className="ps-1" />
              </th>
              <th>
                Quantity
                <img src={Arrow} alt="Arrow Icon" className="ps-1" />
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.products.map((product) => (
              <tr className="product-text" key={product._id}>
                <td>
                  <img
                    className=""
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt="thumbnail"
                    height="40px"
                  />
                </td>
                <td className="pt-4">
                  <b>{product.name}</b>
                </td>
                <td className="pt-4">{product.size}</td>
                <td className="pt-4">{product.color}</td>
                <td className="pt-4">{product.price}</td>
                <td className="pt-4">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default OrderDetails;
