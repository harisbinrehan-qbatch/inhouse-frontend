/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Empty } from 'antd';
import arrowLeft from '../../assets/images/Arrow left.svg';
import MasterCard from '../master-card';
import { setDefaultPaymentMethod } from '../../redux/slices/cart';

import './style.css';

const ManagePaymentsCanvas = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const { paymentDetails } = useSelector((state) => state.cart);

  const handleCardClick = (index) => {
    dispatch(setDefaultPaymentMethod(index));
    // setShow(false);
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
            style={{ cursor: 'pointer' }}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="offcanvas-header.custom-offcanvas-header">
          <Offcanvas.Header>
            <Offcanvas.Title>Payment Methods</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            {paymentDetails.length !== 0 ? (
              <div className="d-flex flex-wrap gap-1 justify-content-around">
                {paymentDetails.map((paymentDetail, index) => (
                  <div
                    key={index}
                    style={{ width: '280px', cursor: 'pointer' }}
                    onClick={() => handleCardClick(index)}
                    className={
                      paymentDetail.isDefault ? 'selected-card' : 'master-card'
                    }
                  >
                    <MasterCard
                      cardholderName={paymentDetail.cardholderName}
                      brand={paymentDetail.brand}
                      cardNumber={paymentDetail.cardNumber}
                      exp_month={paymentDetail.exp_month}
                      exp_year={paymentDetail.exp_year}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="No payment methods found" />
            )}
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default ManagePaymentsCanvas;
