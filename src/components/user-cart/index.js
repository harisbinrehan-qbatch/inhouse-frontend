import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserCartSummary from '../user-cart-summary';
import Arrow from '../../assets/images/Arrow left.svg';
import CartItem from '../user-cart-item';
import Trash from '../../assets/images/Trash.svg';

import './style.css';
import {
  deselectAllCartItems,
  selectAllCartItems,
} from '../../redux/slices/cart';

function UserCart() {
  const { cart } = useSelector((state) => state.cart);
  console.log('CART', cart);

  const [selectAll, setSelectAll] = useState(false);

  const dispatch = useDispatch();

  const toggleSelectAll = () => {
    setSelectAll(() => !selectAll);

    if (selectAll) {
      dispatch(deselectAllCartItems());
    } else {
      dispatch(selectAllCartItems());
    }
  };

  return (
    <div className="container">
      <div className="row">
        {cart.length === 0 ? (
          <div className="col-md-9">
            <div className="d-flex p-2 pt-3">
              <Link to="/">
                <img className="ms-1 pt-2 arrow-size" src={Arrow} alt="<--" />
              </Link>
              <h2 className="heading pt-2 ps-2">
                OOPS! Shopping Bag is empty 🥺
              </h2>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex p-2 pt-3">
              <Link to="/">
                <img className="ms-3 pt-2 arrow-size" src={Arrow} alt="<--" />
              </Link>
              <h2 className="heading pt-2 ps-2">Shopping Bag</h2>
            </div>
            <div className="col-md-9">
              <div className="container pt1 ms-3 me-5 select-all-main-div">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
                <span className="container">
                  Select
                  {' '}
                  {cart.length}
                  {' '}
                  items
                </span>

                <img
                  className={
                    selectAll ? 'cart-trash-enabled' : 'cart-trash-disabled'
                  }
                  src={Trash}
                  alt="trash"
                />
              </div>

              {cart.map((cartItem, index) => (
                <CartItem key={index} cartItem={cartItem} />
              ))}
            </div>
            <UserCartSummary />
          </>
        )}
      </div>
    </div>
  );
}

export default UserCart;
