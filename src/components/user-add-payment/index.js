/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import MasterCard from '../master-card';
import MastercardCanvas from '../mastercard-canvas';
import { getPaymentDetails, placeOrder, setMastercardShow } from '../../redux/slices/cart';
import CustomBtn from '../button';
import Pencil from '../../assets/images/edit-payment.svg';

import './style.css';
import ManagePaymentsCanvas from '../user-manage-payments';

const AddPayment = () => {
  const [multiplePaymentsCanvasShow, setMultiplePaymentsCanvasShow] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const {
    mastercardShow, paymentDetails, userCart, orderSummary,
  } = useSelector((state) => state.cart);

  const defaultCardIndex = paymentDetails.findIndex(
    (paymentDetail) => paymentDetail.isDefault,
  );

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
        cardStripeId:
       defaultCardIndex !== -1
         ? paymentDetails[defaultCardIndex]?.cardId
         : paymentDetails[0]?.cardId,
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

      <div className="selected-card">
        <MasterCard
          cardholderName={
            defaultCardIndex === -1
              ? paymentDetails[0]?.cardholderName
              : paymentDetails[defaultCardIndex]?.cardholderName
          }
          brand={
            defaultCardIndex === -1
              ? paymentDetails[0]?.brand
              : paymentDetails[defaultCardIndex]?.brand
          }
          cardNumber={
            defaultCardIndex === -1
              ? paymentDetails[0]?.cardNumber
              : paymentDetails[defaultCardIndex]?.cardNumber
          }
          exp_month={
            defaultCardIndex === -1
              ? paymentDetails[0]?.exp_month
              : paymentDetails[defaultCardIndex]?.exp_month
          }
          exp_year={
            defaultCardIndex === -1
              ? paymentDetails[0]?.exp_year
              : paymentDetails[defaultCardIndex]?.exp_year
          }
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
