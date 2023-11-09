/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import MasterCard from '../master-card';
import MastercardCanvas from '../mastercard-canvas';
import { placeOrder, setMastercardShow } from '../../redux/slices/cart';
import './style.css';
import CustomBtn from '../button';

function AddPayment() {
  const {
    mastercardShow, paymentDetails, userCart, orderSummary,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleAddPaymentDetails = () => {
    dispatch(setMastercardShow());
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

      console.log('request data is', requestData);

      dispatch(placeOrder(requestData));
    } else {
      console.error('User cart or products are missing.');
    }
  };

  return (
    <div className="container add-payment-main-div">
      <h2 className="p-2 heading">Add Payment</h2>
      <div onClick={handleAddPaymentDetails}>
        <CustomBtn
          className="m-2"
          variant="light"
          btnText={!isEmpty(paymentDetails) ? 'Update' : '+ Add new'}
        />
      </div>
      <div>
        <MasterCard
          bankName=""
          cardNumber=""
          cardholderName=""
          expirationDate=""
          cvc=""
        />
      </div>
      {mastercardShow && (
        <MastercardCanvas
          header={
            isEmpty(paymentDetails)
              ? 'Add Payment Details'
              : 'Update Payment Details'
          }
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
