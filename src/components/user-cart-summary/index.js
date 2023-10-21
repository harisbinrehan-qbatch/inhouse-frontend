import { useSelector } from 'react-redux'; // Import useSelector
import CustomBtn from '../button';
import './style.css';

function UserCartSummary() {
  const cart = useSelector((state) => state.cart.cart);

  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const taxRate = 0.1;
  const tax = subTotal * taxRate;

  const total = subTotal + tax;

  return (
    <div className="card-summary-main-div col-md-3 mt-3">
      <div className="p-3">
        <h3 className="heading">Order Summary</h3>
        <h5 className="pt-3">
          Sub Total: $
          {subTotal.toFixed(2)}
        </h5>
        <h5 className="pt-3">
          Tax: $
          {tax.toFixed(2)}
        </h5>
        <h5 className="pt-3">
          Total: $
          {total.toFixed(2)}
        </h5>
      </div>
      <div className="d-flex justify-content-center pt-3">
        <CustomBtn btnText="Proceed to Checkout" />
      </div>
    </div>
  );
}

export default UserCartSummary;
