/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import UserCartSummary from '../user-cart-summary';
import Arrow from '../../../assets/images/Arrow left.svg';
import CartItem from '../../../components/user-cart-item';
import Trash from '../../../assets/images/Trash.svg';
import CustomBtn from '../../../components/button';
import {
  deleteSelectedAll,
  getAddress,
  getCartOfSpecificUser,
  getPaymentDetails,
  setAddressShow,
  setChangeAddressShow,
  setProceedToCheckout,
} from '../../../redux/slices/cart';
import AddAddress from '../user-add-address-canvas';
import AddPayment from '../user-add-payment';
import AddressBox from '../../../components/user-address-box';
import ChangeAddressCanvas from '../user-change-address-canvas';

import './style.css';

function UserCart() {
  const {
    addressShow,
    changeAddressShow,
    cartProducts,
    userCart,
    addAddressSuccess,
    updateAddressSuccess,
    proceedToCheckout,
    addresses,
  } = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem('user'));
  const [defaultAddress, setDefaultAddress] = useState({});

  const dispatch = useDispatch();

  const [select, setSelect] = useState(false);

  const toggleSelectAll = () => {
    setSelect(() => !select);
  };

  const toggleDeleteAll = () => {
    setSelect(() => !select);
    dispatch(deleteSelectedAll());
  };

  useEffect(() => {
    dispatch(getAddress(user.userId));
    dispatch(getPaymentDetails(user.userId));
  }, [addAddressSuccess, updateAddressSuccess]);

  useEffect(() => {
    dispatch(getCartOfSpecificUser());
    setDefaultAddress(
      addresses?.addressInfo?.find((address) => address.isDefault) || {},
    );
  }, [addresses, cartProducts]);

  const handleAddAddressClick = () => {
    dispatch(setAddressShow());
  };
  const handleChangeAddressClick = () => {
    dispatch(setChangeAddressShow());
  };

  const handleSetProceedToCheckout = () => {
    dispatch(setProceedToCheckout());
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex p-2 pt-3">
          {proceedToCheckout ? (
            <img
              className="ms-3 arrow-size"
              src={Arrow}
              alt="<--"
              onClick={handleSetProceedToCheckout}
            />
          ) : (
            <Link to="/">
              <img className="ms-3 pt-2 arrow-size" src={Arrow} alt="<--" />
            </Link>
          )}
          <h2 className="heading pt-2 ps-2">
            {proceedToCheckout ? 'Checkout' : 'Shopping Bag'}
          </h2>
        </div>

        <div className="col-md-9">
          <div className="container pt1 ms-4 me-5 select-all-main-div">
            {proceedToCheckout ? (
              !isEmpty(defaultAddress) ? (
                <div className="d-flex w-100 justify-content-between">
                  <AddressBox
                    name={defaultAddress.name}
                    mobile={defaultAddress.mobile}
                    address={defaultAddress.address}
                    disableCustomBtn
                  />
                  <CustomBtn
                    btnText="Change"
                    variant="dark"
                    className="m-3"
                    onClick={handleChangeAddressClick}
                  />
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
                  checked={select}
                  onChange={toggleSelectAll}
                />
                <span className="container">
                  Select
                  {' '}
                  {userCart?.products?.length || '0'}
                  {' '}
                  items
                </span>
                <img
                  className={
                    select ? 'cart-trash-enabled' : 'cart-trash-disabled'
                  }
                  src={Trash}
                  alt="trash"
                  onClick={select ? toggleDeleteAll : undefined}
                />
              </>
            )}
          </div>

          {userCart && userCart.products && userCart.products.length > 0 ? (
            userCart.products.map((cartItem, index) => (
              <CartItem key={index} cartItem={cartItem} />
            ))
          ) : (
            <h2 className="d-flex heading pt-2 ps-2 justify-content-around pt-5">
              {proceedToCheckout
                ? 'Please add products in cart to checkout ☝'
                : 'No products in the cart 🥺'}
            </h2>
          )}
        </div>
        <div className="col-md-3">
          <UserCartSummary />
          {proceedToCheckout && (
            <div className="add-payment-container mb-2">
              <AddPayment />
            </div>
          )}
        </div>
      </div>
      {addressShow ? (
        <AddAddress header="Add Delivery Address" />
      ) : changeAddressShow ? (
        <ChangeAddressCanvas header="Choose Address" />
      ) : null}
    </div>
  );
}

export default UserCart;
