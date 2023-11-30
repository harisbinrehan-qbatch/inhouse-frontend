/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import MasterCard from '../master-card';
import { getPaymentDetails, placeOrder, setMastercardShow } from '../../redux/slices/cart';
import CustomBtn from '../button';
import Pencil from '../../assets/images/edit-payment.svg';

import './style.css';
import ManagePaymentsCanvas from '../user-manage-payments';
import AddPaymentCanvas from '../mastercard-canvas';

const AddPayment = () => {
  const [multiplePaymentsCanvasShow, setMultiplePaymentsCanvasShow] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const {
    mastercardShow, selectedCardIndex, paymentDetails, userCart, orderSummary,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleAddPaymentDetails = () => {
    dispatch(setMastercardShow());
  };

  const handleMultiplePaymentDetails = () => {
    setMultiplePaymentsCanvasShow(true);
  };

  useEffect(() => {
    dispatch(getPaymentDetails(user.userId));
  }, []);

  const handlePlaceOrder = () => {
    if (userCart && userCart.products) {
      const requestData = {
        username: user.username,
        userId: user.userId,
        email: user.email,
        stripeId: user.stripeId,
        cardStripeId: paymentDetails[selectedCardIndex]?.cardId,
        products: userCart.products,
        totalAmount: orderSummary.total,
      };

      dispatch(placeOrder(requestData));
    } else {
      console.error('User cart or products are missing.');
    }
  };

  console.log({ selectedCardIndex });

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

      <div className="selected-card">
        <MasterCard
          cardholderName={paymentDetails[selectedCardIndex]?.cardholderName}
          brand={paymentDetails[selectedCardIndex]?.brand}
          cardNumber={paymentDetails[selectedCardIndex]?.cardNumber}
          exp_month={paymentDetails[selectedCardIndex]?.exp_month}
          exp_year={paymentDetails[selectedCardIndex]?.exp_year}
        />
      </div>

      {mastercardShow && <AddPaymentCanvas header="Add Payment Details" />}

      {multiplePaymentsCanvasShow && (
        <ManagePaymentsCanvas
          show={multiplePaymentsCanvasShow}
          setShow={setMultiplePaymentsCanvasShow}
        />
      )}

      {!isEmpty(paymentDetails) && userCart && !isEmpty(userCart.products) && (
        <CustomBtn
          className="d-flex mt-3 ms-2"
          btnText="Place Order"
          variant="primary"
          onClick={handlePlaceOrder}
        />
      )}
    </div>
  );
};

export default AddPayment;
