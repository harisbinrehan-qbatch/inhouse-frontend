/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { message } from 'antd';

import { useEffect, useState } from 'react';
import { addToCart, moveToCartFromNavbar, setOrderSuccess } from '../../redux/slices/cart';
import CustomBtn from '../button';

import './style.css';

const UserProductsDisplay = ({ product }) => {
  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    setProductQuantity(1);
  }, [product]);
  const user = JSON.parse(localStorage.getItem('user'));

  const { isUser } = useSelector((state) => state.authentication);
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(moveToCartFromNavbar());
    dispatch(setOrderSuccess());
    dispatch(addToCart({ userId: user?.userId, product, productQuantity }));
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
            <div className="container d-flex align-items-center justify-content-around gap-5">
              <div className="d-flex">
                <CustomBtn
                  className="py-1"
                  variant="secondary"
                  btnText="-"
                  onClick={() => {
                    if (productQuantity !== 1) {
                      setProductQuantity((prev) => prev - 1);
                    }
                  }}
                />
                <div className="d-flex cart-counter-view ms-2 mt-1 me-2">
                  {productQuantity}
                </div>
                <CustomBtn
                  className="py-1"
                  variant="secondary"
                  btnText="+"
                  onClick={() => {
                    if (productQuantity !== product.quantity) {
                      setProductQuantity((prev) => prev + 1);
                    } else {
                      message.warning('No more products available', 2);
                    }
                  }}
                />
              </div>
              <div>
                <Link to="./shopping-bag">
                  <CustomBtn btnText="Add to cart" onClick={handleAddToCart} />
                </Link>
              </div>
            </div>
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
