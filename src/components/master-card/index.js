import { useSelector } from 'react-redux';
import MasterCardImage from '../../assets/images/mastercard.svg';
import CardBack from '../../assets/images/card-background.png';
import './style.css';

const MasterCard = () => {
  const { paymentDetails } = useSelector((state) => state.cart);

  const formattedCardNumber = paymentDetails && paymentDetails.cardNumber
    ? paymentDetails.cardNumber.slice(12, 16)
    : '00';

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
        <p>****</p>
        <p>{formattedCardNumber}</p>
      </div>
      <div className="d-flex gap-5">
        <div style={{ fontStyle: 'italic' }} className="d-flex ps-4">
          {paymentDetails ? paymentDetails.expiryDate || '00/00' : '00/00'}
        </div>
        <div style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          {paymentDetails ? paymentDetails.cvc || '123' : '000'}
        </div>
      </div>
      <div
        className="d-flex py-2 ps-4 pe-4 justify-content-around"
        style={{ fontWeight: 'bold' }}
      >
        {paymentDetails
          ? paymentDetails.cardholderName || 'Dummy Name'
          : 'Dummy Name'}
      </div>
    </div>
  );
};

export default MasterCard;
