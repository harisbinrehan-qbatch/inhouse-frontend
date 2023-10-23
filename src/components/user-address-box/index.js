import { useDispatch } from 'react-redux';
import CustomBtn from '../button';
import { setDefaultAddress } from '../../redux/slices/cart';

function AddressBox({
  name,
  mobile,
  address,
  disableCustomBtn,
  isDefault,
  index,
}) {
  const dispatch = useDispatch();

  const handleSetDefaultAddress = () => {
    dispatch(setDefaultAddress(index));
  };

  return (
    <div className="d-flex address-box">
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
      <div>
        {!disableCustomBtn && (
          <div className="m-3">
            <CustomBtn
              btnText="Default"
              variant={isDefault ? 'success' : 'light'}
              onClick={handleSetDefaultAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddressBox;
