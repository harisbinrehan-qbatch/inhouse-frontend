/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { savePaymentDetails, setMastercardShow } from '../../redux/slices/cart';
import arrowLeft from '../../assets/images/Arrow left.svg';
import CustomForm from '../input';
import CustomBtn from '../button';

import './style.css';

const AddPaymentCanvas = ({ header }) => {
  const { mastercardShow, paymentDetails } = useSelector((state) => state.cart);

  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isMonthValid, setIsMonthValid] = useState(false);
  const [isYearValid, setIsYearValid] = useState(false);
  const [cardNumberSuggestions, setCardNumberSuggestions] = useState([]);
  const [monthSuggestions, setMonthSuggestions] = useState([]);
  const [yearSuggestions, setYearSuggestions] = useState([]);

  const validateCardNumber = (inputCardNumber) => {
    // Card number should be of 16 digits
    const isValidLength = inputCardNumber.length === 16;
    setIsCardNumberValid(isValidLength);

    // Suggestions logic: Display a suggestion if the length is less than 16
    const localCardNumberSuggestions = isValidLength
      ? []
      : ['Card number should be 16 digits.'];
    setCardNumberSuggestions(localCardNumberSuggestions);
  };

  const validateMonth = (inputMonth) => {
    // Month should be from 1 to 12
    const isValidMonth = inputMonth >= 1 && inputMonth <= 12;
    setIsMonthValid(isValidMonth);

    // Suggestions logic: Display a suggestion if the month is not within the valid range
    const localMonthSuggestions = isValidMonth
      ? []
      : ['Month should be between 1 and 12.'];
    setMonthSuggestions(localMonthSuggestions);
  };

  const validateYear = (inputYear) => {
    // Year should be from 23 to 90 (adjust as needed)
    const isValidYear = inputYear >= 23 && inputYear <= 90;
    setIsYearValid(isValidYear);

    // Suggestions logic: Display a suggestion if the year is not within the valid range
    const localYearSuggestions = isValidYear
      ? []
      : ['Year should be between 23 and 90.'];
    setYearSuggestions(localYearSuggestions);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  const [cardholderName, setCardholderName] = useState(
    paymentDetails?.cardholderName || '',
  );
  const [number, setNumber] = useState(paymentDetails?.cardNumber || '');
  const [exp_month, setExpiryMonth] = useState(
    paymentDetails?.expiryMonth || '',
  );
  const [exp_year, setExpiryYear] = useState(paymentDetails?.expiryYear || '');

  const handleClose = () => {
    dispatch(setMastercardShow());
  };

  const handleSavePaymentDetails = () => {
    const paymentDetailsUpdated = {
      cardholderName,
      cardNumber: number,
      expiryMonth: exp_month,
      expiryYear: exp_year,
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
            style={{ cursor: 'pointer' }}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="offcanvas-header custom-offcanvas-header">
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
                  onChange={(e) => {
                    validateCardNumber(e.target.value);
                    setNumber(e.target.value);
                  }}
                  hint={(
                    <span className={isCardNumberValid ? 'success-hint' : ''}>
                      {cardNumberSuggestions.join(' ')}
                    </span>
                  )}
                />
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div>
                  <CustomForm
                    label="Expiry Month"
                    placeholder="Expiry month"
                    value={exp_month}
                    onChange={(e) => {
                      validateMonth(parseInt(e.target.value, 10));
                      setExpiryMonth(parseInt(e.target.value, 10));
                    }}
                    hint={(
                      <span className={isMonthValid ? 'success-hint' : ''}>
                        {monthSuggestions.join(' ')}
                      </span>
                    )}
                  />
                </div>

                <div>
                  <CustomForm
                    label="Expiry Year"
                    placeholder="Expiry year"
                    value={exp_year}
                    hint={(
                      <span className={isYearValid ? 'success-hint' : ''}>
                        {yearSuggestions.join(' ')}
                      </span>
                    )}
                    onChange={(e) => {
                      validateYear(parseInt(e.target.value, 10));
                      setExpiryYear(parseInt(e.target.value, 10));
                    }}
                  />
                </div>
              </div>
              <div className="pt-4">
                <CustomForm
                  label="Cardholder Name"
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <CustomBtn
                  btnText="Save"
                  onClick={handleSavePaymentDetails}
                  disabled={!isCardNumberValid || !isMonthValid || !isYearValid}
                />
              </div>
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default AddPaymentCanvas;
