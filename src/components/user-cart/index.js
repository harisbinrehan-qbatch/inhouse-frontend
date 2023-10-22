/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserCartSummary from '../user-cart-summary';
import Arrow from '../../assets/images/Arrow left.svg';
import CartItem from '../user-cart-item';
import Trash from '../../assets/images/Trash.svg';
import CustomBtn from '../button';
import './style.css';
import {
  deselectAllCartItems,
  selectAllCartItems,
  setAddressShow,
} from '../../redux/slices/cart';
import AddAddress from '../user-add-address-canvas';
import AddPayment from '../user-add-payment';
import AddressBox from '../user-address-box';

function UserCart() {
  const {
    addressShow, cart, proceedToCheckout, haveAddress, addresses,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(() => !selectAll);

    if (selectAll) {
      dispatch(deselectAllCartItems());
    } else {
      dispatch(selectAllCartItems());
    }
  };

  const handleAddAddressClick = () => {
    dispatch(setAddressShow());
  };

  return (
    <div className="container">
      <div className="row">
        {cart.length === 0 ? (
          <div className="">
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
                {proceedToCheckout ? (
                  haveAddress ? (
                    <div className="d-flex w-100 justify-content-between">
                      <AddressBox
                        name={addresses[0].name}
                        mobile={addresses[0].mobile}
                        address={addresses[0].address}
                      />
                      <CustomBtn btnText="Change" variant="light" className="m-3" />
                    </div>
                  ) : (
                    <CustomBtn
                      btnText="Add Delivery Address"
                      onClick={handleAddAddressClick}
                    />
                  )
                ) : (
                  <>
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
                  </>
                )}
              </div>

              {cart.map((cartItem, index) => (
                <CartItem key={index} cartItem={cartItem} />
              ))}
            </div>
            <>
              <UserCartSummary />
              {proceedToCheckout && (
                <div className="add-payment-container">
                  <AddPayment />
                </div>
              )}
            </>
          </>
        )}
      </div>
      {addressShow && <AddAddress header="Add Delivery Address" />}
    </div>
  );
}

export default UserCart;
