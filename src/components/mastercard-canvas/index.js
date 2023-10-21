/* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';

import arrowLeft from '../../assets/images/Arrow left.svg';

import './style.css';
import CustomForm from '../input';
import CustomBtn from '../button';
import { setMastercardShow } from '../../redux/slices/cart';

const MastercardCanvas = ({ header }) => {
  const { mastercardShow } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setMastercardShow());
  };

  return (
    <Offcanvas
      show={mastercardShow}
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
