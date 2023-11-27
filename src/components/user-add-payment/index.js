/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import MasterCard from '../master-card';
import MastercardCanvas from '../mastercard-canvas';
import { placeOrder, setMastercardShow } from '../../redux/slices/cart';
import CustomBtn from '../button';
import Pencil from '../../assets/images/edit-payment.svg';

import './style.css';
import ManagePaymentsCanvas from '../user-manage-payments';

function AddPayment() {
  const [multiplePaymentsCanvasShow, setMultiplePaymentsCanvasShow] = useState(false);

  const {
    mastercardShow, paymentDetails, userCart, orderSummary,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleAddPaymentDetails = () => {
    dispatch(setMastercardShow());
  };

  const handleMultiplePaymentDetails = () => {
    setMultiplePaymentsCanvasShow(true);
  };

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (userCart && userCart.products) {
      const requestData = {
        username: user.username,
        userId: user.userId,
        products: userCart.products,
        orderSummary,
      };

      dispatch(placeOrder(requestData));
    } else {
      console.error('User cart or products are missing.');
    }
  };

  return (
    <div className="container add-payment-main-div">
      <h2 className="p-2 heading">Add Payment</h2>
      <div className="d-flex justify-content-between">
        <div onClick={handleAddPaymentDetails}>
          <CustomBtn className="m-2" variant="light" btnText="+ Add New" />
        </div>
        <div>
          <img
            src={Pencil}
            alt="multiple-payments"
            style={{ cursor: 'pointer' }}
            onClick={handleMultiplePaymentDetails}
            className="m-2 cart-trash-enabled"
          />
        </div>
      </div>

      <div>
        <MasterCard
          cardholderName={paymentDetails[0]?.cardholderName}
          brand={paymentDetails[0]?.brand}
          cardNumber={paymentDetails[0]?.cardNumber}
          exp_month={paymentDetails[0]?.exp_month}
          exp_year={paymentDetails[0]?.exp_year}
        />
      </div>
      {mastercardShow && <MastercardCanvas header="Add Payment Details" />}

      {multiplePaymentsCanvasShow && (
        <ManagePaymentsCanvas
          show={multiplePaymentsCanvasShow}
          setShow={setMultiplePaymentsCanvasShow}
        />
      )}

      {!isEmpty(paymentDetails) && userCart && !isEmpty(userCart.products) && (
        <CustomBtn
          className="d-flex my-4"
          btnText="Place Order"
          variant="primary"
          onClick={handlePlaceOrder}
        />
      )}
    </div>
  );
}

export default AddPayment;
