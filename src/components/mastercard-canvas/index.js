/* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';

import arrowLeft from '../../assets/images/Arrow left.svg';
import { setShow } from '../../redux/slices/products';

import './style.css';
import CustomForm from '../input';
import CustomBtn from '../button';

const MastercardCanvas = ({ header }) => {
  const { show } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   _id,
  //   name: 'Haris Bin Rehan',
  //   mobile: '03012633285',
  //   country: 'Pakistan',
  //   province: 'Punjab',
  //   city: 'Lahore',
  //   Address: 'Asia Center, Qbatch',
  // });

  const handleClose = () => {
    dispatch(setShow());
  };

  return (
    <Offcanvas
      show={show}
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
                <CustomForm label="Card Number" placeholder="Card Number" />
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div>
                  <CustomForm label="Expiry Date" placeholder="Expiry date" />
                </div>
                <div>
                  <CustomForm label="CVC" placeholder="cvc" />
                </div>
              </div>
              <div className=" pt-4">
                <CustomForm label="Country" placeholder="Country" />
              </div>
              <div className="mt-5">
                <CustomBtn btnText="Save" />
              </div>
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default MastercardCanvas;
