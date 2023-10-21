import React from 'react';
import MasterCardImage from '../../assets/images/mastercard.svg';
import CardBack from '../../assets/images/card-background.png';
import './style.css';

const MasterCard = ({
  cardNumber, cardholderName, expirationDate, cvc,
}) => {
  const formattedCardNumber = cardNumber.match(/.{3}/g).join(' ');

  const cardBackStyle = {
    backgroundImage: `url(${CardBack})`,
    backgroundSize: 'cover',
  };

  return (
    <div className="master-card container mt-4" style={cardBackStyle}>
      <div className="d-flex p-2">
        <img src={MasterCardImage} alt="MasterCardImage" />
        <p className="ps-3 pt-3" style={{ fontWeight: 'bold' }}>
          Master Card
        </p>
      </div>
      <div
        style={{ fontWeight: 'bold' }}
        className="d-flex justify-content-around"
      >
        <p>****</p>
        <p>****</p>
        <p>***</p>
        <p>{formattedCardNumber.split(' ')[3]}</p>
      </div>
      <div className="d-flex gap-5">
        <div style={{ fontStyle: 'italic' }} className="d-flex ps-4">
          {expirationDate}
        </div>
        <div style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{cvc}</div>
      </div>
      <div
        className="d-flex py-2 ps-4 pe-4 justify-content-around"
        style={{ fontWeight: 'bold' }}
      >
        {cardholderName}
      </div>
    </div>
  );
};

export default MasterCard;
