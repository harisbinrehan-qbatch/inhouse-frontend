/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSelector, useDispatch } from 'react-redux';

import CustomBtn from '../button';
import MasterCard from '../master-card';

import './style.css';
import MastercardCanvas from '../mastercard-canvas';
import { placeOrder, setMastercardShow } from '../../redux/slices/cart';

function AddPayment() {
  const {
    mastercardShow, haveAddress, paymentDetails, cartProducts, orderSummary,
  } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();

  const handleAddPaymentDetails = () => {
    dispatch(setMastercardShow());
  };

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const requestData = {
      userId: user.userId,
      products: cartProducts,
      orderSummary,
    };

    dispatch(placeOrder(requestData));
  };
  return (
    <div className="container add-payment-main-div col-md-3">
      <h2 className="p-2 heading">Add Payment</h2>
      <div onClick={handleAddPaymentDetails}>
        <CustomBtn className="m-2" variant="light" btnText="+ Add new" />
      </div>
      <div>
        <MasterCard
          bankName="HBL"
          cardNumber="02857900455603"
          cardholderName="Haris Bin Rehan"
          expirationDate="07/23"
          cvc="123"
        />
      </div>
      {mastercardShow && <MastercardCanvas header="Add Payment Method" />}
      {haveAddress && paymentDetails && <CustomBtn className="d-flex my-4" btnText="Place Order" variant="success" onClick={handlePlaceOrder} />}
    </div>
  );
}

export default AddPayment;
