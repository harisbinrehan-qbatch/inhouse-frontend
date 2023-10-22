// import CustomBtn from '../button';
import './style.css';

function AddressBox({ name, mobile, address }) {
  return (
    <div className="d-flex">
      <div className="container p-2">
        <div className="d-flex gap-2">
          <strong>Deliver to:</strong>
          <p>{name}</p>
        </div>
        <div className="d-flex gap-2">
          <strong>Mobile:</strong>
          <p>{mobile}</p>
        </div>
        <div className="d-flex gap-2">
          <strong>Address:</strong>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
}
export default AddressBox;
