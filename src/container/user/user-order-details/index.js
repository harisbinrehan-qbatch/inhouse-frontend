/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import arrowLeft from '../../../assets/images/Arrow left.svg';
import Arrow from '../../../assets/images/Arrow-up-down.svg';
import { setUserOrderDetailsShow } from '../../../redux/slices/cart';

const UserOrderDetailsCanvas = ({ orderData }) => {
  const { userOrderDetailsShow } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setUserOrderDetailsShow());
  };

  return (
    <Offcanvas
      show={userOrderDetailsShow}
      onHide={handleClose}
      placement="end"
      className="custom-offcanvas"
      height={600}
    >
      <div className="d-flex add-product-header">
        <div>
          <img
            src={arrowLeft}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="">
          <Offcanvas.Header>
            <Offcanvas.Title>Order Details</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex offcanvas-body">
        <Offcanvas.Body>
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
                {orderData?.products?.map((product) => (
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
                    <td className="pt-4 ps-5">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Offcanvas.Body>
      </div>
    </Offcanvas>
  );
};

export default UserOrderDetailsCanvas;
