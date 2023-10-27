import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import { setOrderSummary, setProceedToCheckout } from '../../../redux/slices/cart';
import CustomBtn from '../../../components/button';

function UserCartSummary() {
  const { userCart, orderSummary } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSetProceedToCheckout = () => {
    dispatch(setProceedToCheckout());
  };

  useEffect(() => {
    if (userCart && userCart.products) {
      const subTotal = userCart.products.reduce(
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
    }
  }, [userCart]);

  return (
    <div className="card-summary-main-div mb-3">
      <div className="p-3">
        <h3 className="heading">Order Summary</h3>
        <h5 className="pt-3">
          Sub Total: $
          {orderSummary ? orderSummary?.subTotal?.toFixed?.(2) : '0'}
        </h5>
        <h5 className="pt-3">
          Tax: $
          {orderSummary ? orderSummary?.tax?.toFixed?.(2) : '0'}
        </h5>
        <h5 className="pt-3">
          Total: $
          {orderSummary ? orderSummary?.total?.toFixed?.(2) : '0'}
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
