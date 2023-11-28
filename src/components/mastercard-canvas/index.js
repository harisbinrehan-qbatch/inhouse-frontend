/* eslint-disable camelcase */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { savePaymentDetails, setMastercardShow } from '../../redux/slices/cart';
import arrowLeft from '../../assets/images/Arrow left.svg';
import CustomForm from '../input';
import CustomBtn from '../button';

import './style.css';

const MastercardCanvas = ({ header }) => {
  const { mastercardShow, paymentDetails } = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  const [cardholderName, setCardholderName] = useState(
    paymentDetails?.cardholderName,
  );
  const [number, setNumber] = useState(
    paymentDetails?.cardNumber,
  );
  const [exp_month, setExpiryMonth] = useState(paymentDetails?.expiryDate);
  const [exp_year, setExpiryYear] = useState(paymentDetails?.cvc);

  const handleClose = () => {
    dispatch(setMastercardShow());
  };

  const handleSavePaymentDetails = () => {
    const paymentDetailsUpdated = {
      number,
      exp_month,
      exp_year,
      cardholderName,
    };

    if (user) {
      dispatch(
        savePaymentDetails({
          userId: user.userId,
          paymentDetails: paymentDetailsUpdated,
        }),
      );
      handleClose();
    }
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
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div>
                  <CustomForm
                    label="Expiry Month"
                    placeholder="Expiry month"
                    value={exp_month}
                    onChange={(e) => setExpiryMonth(parseInt(e.target.value, 10))}
                  />
                </div>

                <div>
                  <CustomForm
                    label="Expiry Year"
                    placeholder="Expiry year"
                    value={exp_year}
                    onChange={(e) => setExpiryYear(parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
              <div className=" pt-4">
                <CustomForm
                  label="Cardholder Name"
                  placeholder="Cardholder Name"
                  value={user.username}
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
