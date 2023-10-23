import React, { useEffect } from 'react'; // Make sure to import React if you're using JSX
import { useSelector, useDispatch } from 'react-redux';
import { setOrderSummary, setProceedToCheckout } from '../../redux/slices/cart';
import CustomBtn from '../button';

import './style.css';

function UserCartSummary() {
  const { cartProducts, orderSummary } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSetProceedToCheckout = () => {
    dispatch(setProceedToCheckout());
  };

  useEffect(() => {
    // Save order summary details to Redux state and set 'proceedToCheckout' to true
    const subTotal = cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const taxRate = 0.1;
    const tax = subTotal * taxRate;

    const total = subTotal + tax;

    dispatch(
      setOrderSummary({
        subTotal,
        tax,
        total,
      }),
    );
  }, [cartProducts, dispatch]);

  return (
    <div className="card-summary-main-div col-md-3">
      <div className="p-3">
        <h3 className="heading">Order Summary</h3>
        <h5 className="pt-3">
          Sub Total: $
          {orderSummary ? orderSummary.subTotal.toFixed(2) : 'N/A'}
        </h5>
        <h5 className="pt-3">
          Tax: $
          {orderSummary ? orderSummary.tax.toFixed(2) : 'N/A'}
        </h5>
        <h5 className="pt-3">
          Total: $
          {orderSummary ? orderSummary.total.toFixed(2) : 'N/A'}
        </h5>
      </div>
      <div className="d-flex justify-content-center pt-3">
        <CustomBtn
          btnText="Proceed to Checkout"
          onClick={handleSetProceedToCheckout}
        />
      </div>
    </div>
  );
}

export default UserCartSummary;
