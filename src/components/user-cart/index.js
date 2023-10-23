/* eslint-disable no-nested-ternary */
import { useState } from 'react';
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
  setChangeAddressShow,
} from '../../redux/slices/cart';
import AddAddress from '../user-add-address-canvas';
import AddPayment from '../user-add-payment';
import AddressBox from '../user-address-box';
import ChangeAddressCanvas from '../user-change-address-canvas';

function UserCart() {
  const {
    addressShow,
    changeAddressShow,
    cart,
    proceedToCheckout,
    haveAddress,
    addresses,
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
  const handleChangeAddressClick = () => {
    dispatch(setChangeAddressShow());
  };

  const defaultAddress = addresses.find((address) => address.isDefault);

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
              <div className="container pt1 ms-4 me-5 select-all-main-div">
                {proceedToCheckout ? (
                  haveAddress && defaultAddress ? (
                    <div className="d-flex w-100 justify-content-between">
                      <AddressBox
                        name={defaultAddress.name}
                        mobile={defaultAddress.mobile}
                        address={defaultAddress.address}
                        disableCustomBtn
                      />
                      <CustomBtn
                        btnText="Change"
                        variant="light"
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
      {addressShow ? (
        <AddAddress header="Add Delivery Address" />
      ) : changeAddressShow ? (
        <ChangeAddressCanvas header="Choose Address" />
      ) : null}
    </div>
  );
}

export default UserCart;
