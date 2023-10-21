/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSelector, useDispatch } from 'react-redux';

import CustomBtn from '../button';
import MasterCard from '../master-card';

import './style.css';
import MastercardCanvas from '../mastercard-canvas';
import { setMastercardShow } from '../../redux/slices/cart';

function AddPayment() {
  const { mastercardShow } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddPaymentDetails = () => {
    console.log('Here?????');
    dispatch(setMastercardShow());
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
    </div>
  );
}

export default AddPayment;
