import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductImage from '../../assets/images/product.png';
import CustomBtn from '../button';
import Trash from '../../assets/images/Trash.svg';
import {
  decrementQuantity,
  getCartOfSpecificUser,
  incrementQuantity,
  removeFromCart,
} from '../../redux/slices/cart';
import './style.css';

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

function CartItem({ cartItem }) {
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(cartItem));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(cartItem));
  };

  const handleRemoveFromCart = () => {
    if (isSelected) {
      dispatch(removeFromCart(cartItem));
    }
  };

  useEffect(() => {
    dispatch(getCartOfSpecificUser());
  }, [cartItem]);

  return (
    <div
      className={`d-flex cart-item-main-div my-3 ms-4 me-3 ${
        isSelected ? 'selected' : ''
      }`}
    >
      <div className="container d-flex align-items-center px-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="checkbox pe-3"
        />
        <img src={ProductImage} alt="product" className="product-image" />
        <div>
          <div className="container d-flex ps-3 px-2">{cartItem.name}</div>
          <div className="d-flex gap-5 ps-3">
            <div className="pt-3">{cartItem.size}</div>
            <div className="pt-3">{getColorName(cartItem.color)}</div>
          </div>
        </div>
      </div>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <CustomBtn
            className="py-1"
            variant="secondary"
            btnText="-"
            onClick={handleDecrementQuantity}
          />
          <div className="d-flex cart-counter-view ms-2 mt-1 me-2">
            {cartItem.quantity}
          </div>
          <CustomBtn
            className="py-1"
            variant="secondary"
            btnText="+"
            onClick={handleIncrementQuantity}
          />
        </div>
        <div>
          Price:
          {cartItem.price}
        </div>
        <div className="cart-trash">
          <img
            src={Trash}
            alt="trash"
            onClick={handleRemoveFromCart}
            className={
              isSelected ? 'cart-trash-enabled' : 'cart-trash-disabled'
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
