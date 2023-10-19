import React, { useState } from 'react';
import ProductImage from '../../assets/images/product.png';
import CustomBtn from '../button';
import Trash from '../../assets/images/Trash.svg';
import './style.css';

function CartItem({ product }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  if (!product) {
    return null;
  }

  return (
    <div
      className={`d-flex cart-item-main-div m-3 ${
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
          <div className="container d-flex ps-3 px-2">{product.name}</div>
          <div className="d-flex gap-5 ps-3">
            <div className="pt-3">M</div>
            <div className="pt-3">Black</div>
          </div>
        </div>
      </div>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <CustomBtn className="py-1" variant="secondary" btnText="-" />
          <div className="d-flex cart-counter-view ms-2 mt-1 me-2">1</div>
          <CustomBtn className="py-1" variant="secondary" btnText="+" />
        </div>
        <div>
          Rs.
          {' '}
          {product.price}
        </div>
        <div className="cart-trash">
          <img src={Trash} alt="trash" />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
