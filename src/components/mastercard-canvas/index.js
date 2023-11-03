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
  const dispatch = useDispatch();

  const [cardholderName, setCardholderName] = useState(
    paymentDetails?.cardholderName,
  );
  const [cardNumber, setCardNumber] = useState(
    paymentDetails?.cardNumber,
  );
  const [expiryDate, setExpiryDate] = useState(
    paymentDetails?.expiryDate,
  );
  const [cvc, setCvc] = useState(paymentDetails?.cvc);

  const handleClose = () => {
    dispatch(setMastercardShow());
  };

  const handleSavePaymentDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const paymentDetailsUpdated = {
      cardNumber,
      expiryDate,
      cvc,
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
