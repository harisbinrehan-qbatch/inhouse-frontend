import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import MasterCard from '../master-card';
import {
  deletePaymentDetails,
  getPaymentDetails,
  placeOrder,
  setMastercardShow,
} from '../../redux/slices/cart';
import CustomBtn from '../button';
import Pencil from '../../assets/images/edit-payment.svg';
import Trash from '../../assets/images/Trash.svg';
import ManagePaymentsCanvas from '../user-manage-payments';
import AddPaymentCanvas from '../user-add-payment-canvas';

import './style.css';
import EditPaymentCanvas from '../user-edit-payment-canvas';

const AddPayment = () => {
  const [multiplePaymentsCanvasShow, setMultiplePaymentsCanvasShow] = useState(false);
  const [editPaymentCanvasShow, setEditPaymentCanvasShow] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const {
    mastercardShow,
    selectedCardIndex,
    paymentDetails,
    userCart,
    orderSummary,
    paymentDetailsStatus,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleAddPaymentDetails = () => {
    dispatch(setMastercardShow());
    // dispatch(getPaymentDetails(user.userId));
  };

  const handleMultiplePaymentDetails = () => {
    setMultiplePaymentsCanvasShow(true);
  };

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

  const handleEditPaymentCanvas = () => {
    setEditPaymentCanvasShow(true);
  };
  const handleDeletePaymentDetails = async () => {
    const cardStripeId = paymentDetails[selectedCardIndex].cardId;
    const userStripeId = user.stripeId;

    await dispatch(deletePaymentDetails({ cardStripeId, userStripeId }));
  };
  useEffect(() => {
    dispatch(getPaymentDetails(user.userId));
  }, [paymentDetailsStatus]);

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
      {!isEmpty(paymentDetails) ? (
        <div className="d-flex mt-3 me-3 gap-2 justify-content-end">
          <img
            src={Pencil}
            alt="multiple-payments"
            style={{ cursor: 'pointer' }}
            onClick={handleEditPaymentCanvas}
          />
          <img
            src={Trash}
            alt="trash"
            style={{ cursor: 'pointer' }}
            onClick={handleDeletePaymentDetails}
          />
        </div>
      ) : null}

      {mastercardShow && <AddPaymentCanvas header="Add Payment Details" />}

      {editPaymentCanvasShow && (
      <EditPaymentCanvas
        show={editPaymentCanvasShow}
        setShow={setEditPaymentCanvasShow}
      />
      )}

      {multiplePaymentsCanvasShow && (
        <ManagePaymentsCanvas
          show={multiplePaymentsCanvasShow}
          setShow={setMultiplePaymentsCanvasShow}
        />
      )}

      {!isEmpty(paymentDetails) && userCart && !isEmpty(userCart.products) ? (
        <CustomBtn
          className="ms-2"
          btnText="Place Order"
          variant="primary"
          onClick={handlePlaceOrder}
        />
      ) : (
        <CustomBtn
          className="ms-2"
          btnText="Place Order"
          variant="primary"
          onClick={handlePlaceOrder}
          disabled="true"
        />
      )}
    </div>
  );
};

export default AddPayment;
