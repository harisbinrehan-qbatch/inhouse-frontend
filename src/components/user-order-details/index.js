import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import arrowLeft from '../../assets/images/Arrow left.svg';
import { setUserOrderDetailsShow } from '../../redux/slices/cart';

const colorMap = {
  '#155724': 'green',
  '#AAA': 'grey',
  '#1B1E21': 'black',
  '#231579': 'blue',
  '#740F0F': 'red'
};

function getColorName(hexCode) {
  if (hexCode) {
    const color = colorMap[hexCode];
    return color || '';
  }
  return '';
}

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
            style={{ cursor: 'pointer' }}
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
            <Table bordered hover responsive>
              <thead>
                <tr className="table-secondary mt-3">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Quantity</th>
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
                    <td className="pt-4">{getColorName(product.color)}</td>
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
