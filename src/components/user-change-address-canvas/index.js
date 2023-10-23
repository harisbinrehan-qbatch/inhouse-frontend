/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { setAddressShow, setChangeAddressShow } from '../../redux/slices/cart';
import arrowLeft from '../../assets/images/Arrow left.svg';
import AddressBox from '../user-address-box';

import './style.css';
import CustomBtn from '../button';

const ChangeAddressCanvas = ({ header }) => {
  const { changeAddressShow, addresses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setChangeAddressShow());
  };

  const handleAddAddressClick = () => {
    dispatch(setAddressShow());
  };

  return (
    <Offcanvas
      show={changeAddressShow}
      onHide={handleClose}
      placement="end"
      className="custom-offcanvas"
      height={600}
    >
      <div className="d-flex add-product-header">
        <div>
          <img
            src={arrowLeft}
            alt="Arrow Left"
            className="img-large ps-2 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="custom-offcanvas-header p-2">
          <Offcanvas.Header>
            <Offcanvas.Title>{header}</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            <div className="container pt-2">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className="mt-3"
                  style={{ border: '1px solid #000', borderRadius: '10px' }}
                >
                  <AddressBox
                    name={address.name}
                    mobile={address.mobile}
                    address={address.address}
                    isDefault={address.isDefault}
                    index={index}
                  />
                </div>
              ))}
            </div>
            <div>
              <CustomBtn
                className="d-flex m-3 mt-5"
                btnText="Add New"
                onClick={handleAddAddressClick}
              />
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default ChangeAddressCanvas;
