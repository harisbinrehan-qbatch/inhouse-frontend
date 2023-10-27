import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { setAddressShow, addAddress } from '../../../redux/slices/cart';

import CustomForm from '../../../components/input';
import CustomBtn from '../../../components/button';
import arrowLeft from '../../../assets/images/Arrow left.svg';

import './style.css';

const AddAddress = ({ header }) => {
  const [name, setName] = useState('Haris Bin Rehan');
  const [mobile, setMobile] = useState('03104106129');
  const [country, setCountry] = useState('Pakistan');
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('Asia center, Qbatch');
  const [isDefault, setIsDefault] = useState(false);
  const { addressShow } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleClose = () => {
    dispatch(setAddressShow());
  };

  const handleSaveAddress = () => {
    const newAddress = {
      userId: user.userId,
      name,
      mobile,
      country,
      province,
      city,
      address,
      isDefault,
    };

    dispatch(addAddress(newAddress));
    handleClose();
  };

  return (
    <Offcanvas
      show={addressShow}
      onHide={handleClose}
      placement="end"
      className="custom-offcanvas"
      height={600}
    >
      <div className="d-flex add-product-header">
        <div>
          <img
            src={arrowLeft}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="offcanvas-header.custom-offcanvas-header">
          <Offcanvas.Header>
            <Offcanvas.Title>{header}</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            <div className="container pt-2">
              <div>
                <CustomForm
                  label="Name"
                  placeholder="Please enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div>
                  <CustomForm
                    label="Mobile #"
                    placeholder="Mobile #"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div>
                  <CustomForm
                    label="Country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div>
                  <CustomForm
                    label="Province"
                    placeholder="Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
                <div>
                  <CustomForm
                    label="City"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className=" pt-4">
                <CustomForm
                  label="Address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="d-flex pt-4">
                <label>
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={() => setIsDefault(!isDefault)}
                  />
                </label>
                <p className="ps-3">Set as default address</p>
              </div>
              <div className="mt-5">
                <CustomBtn btnText="Save" onClick={handleSaveAddress} />
              </div>
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default AddAddress;
