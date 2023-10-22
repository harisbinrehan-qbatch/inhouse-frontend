import React, { useState } from 'react'; // Make sure to import React
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import CustomForm from '../input';
import CustomBtn from '../button';
import { setMastercardShow, setPaymentDetails } from '../../redux/slices/cart';
import arrowLeft from '../../assets/images/Arrow left.svg';

import './style.css';

const MastercardCanvas = ({ header }) => {
  const { mastercardShow } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Initialize state variables for input values
  const [cardholderName, setCardholderName] = useState('Haris Bin Rehan'); // Initialize with an empty string
  const [cardNumber, setCardNumber] = useState('02857900455603'); // Initialize with an empty string
  const [expiryDate, setExpiryDate] = useState('07/25'); // Initialize with an empty string
  const [cvc, setCvc] = useState('123'); // Initialize with an empty string

  const handleClose = () => {
    dispatch(setMastercardShow());
  };

  const handleSavePaymentDetails = () => {
    // Create an object to store payment details
    const paymentDetails = {
      cardNumber,
      expiryDate,
      cvc,
      cardholderName,
    };

    dispatch(setPaymentDetails(paymentDetails));
    // handleClose();
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
                <CustomForm
                  label="Card Number"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div>
                  <CustomForm
                    label="Expiry Date"
                    placeholder="Expiry date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div>
                  <CustomForm
                    label="CVC"
                    placeholder="cvc"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                </div>
              </div>
              <div className=" pt-4">
                <CustomForm
                  label="Cardholder Name"
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <CustomBtn btnText="Save" onClick={handleSavePaymentDetails} />
              </div>
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default MastercardCanvas;
