/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart } from '../../redux/slices/cart';
import CustomBtn from '../button';

import './style.css';

const UserProductsDisplay = ({ product }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'));

  const { isUser } = useSelector((state) => state.authentication);
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ userId: user?.userId, product }));
  };

  const colorMap = {
    '#155724': 'green',
    '#AAA': 'grey',
    '#1B1E21': 'black',
    '#231579': 'blue',
    '#740F0F': 'red',
  };

  function getColorName(hexCode) {
    return colorMap[hexCode] || hexCode;
  }

  return (
    <div>
      <div className="m-4 ms-3 p-4 user-products-display-main-div">
        <div className="d-flex">
          <img
            src={`http://localhost:5000/${product.images[0]}`}
            alt="product"
            className="user-products-display-image"
          />
          <div className="">
            <div className="p-3">
              <b>{product.name}</b>
            </div>
            <div className="ps-3">
              <b>Color</b>
              <div className="d-flex p-2 pe-3">
                {getColorName(product.color)}
              </div>
            </div>
            <div className="mt-1 ps-3 pe-3">
              <p className="">
                <b>Size</b>
              </p>
              <div className="d-flex ps-2">{product.size}</div>
              <div className="d-flex ps-1 mt-3">
                <p>
                  <b>Price : </b>
                </p>
                <p className="ps-2" style={{ color: 'blue' }}>
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex pt-5 justify-content-end">
          {isUser ? (
            <Link to="user/shopping-bag">
              <CustomBtn btnText="Add to cart" onClick={handleAddToCart} />
            </Link>
          ) : (
            <Link to="/auth/login">
              <CustomBtn btnText="Login to continue" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProductsDisplay;
