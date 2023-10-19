import CustomBtn from '../button';
import './style.css';

function UserCartSummary() {
  return (
    <div className="card-summary-main-div col-md-3 mt-3">
      <div className="p-3">
        <h3 className="heading">Order Summary</h3>
        <h5 className="pt-3">Sub Total :</h5>
        <h5 className="pt-3">Tax :</h5>
        <h5 className="pt-3">Total :</h5>
      </div>
      <div className="d-flex justify-content-center pt-3 ">
        <CustomBtn btnText="Proceed to Checkout" />
      </div>
    </div>
  );
}

export default UserCartSummary;
