import { Link } from 'react-router-dom';
import CartItem from '../user-cart-item';

import UserCartSummary from '../user-cart-summary';
import Arrow from '../../assets/images/Arrow left.svg';
import './style.css';

function UserCart() {
  return (
    <div className="container">
      <div className="d-flex p-2 pt-3">
        <Link to="/">
          <img className="ms-1 pt-2 arrow-size" src={Arrow} alt="<--" />
        </Link>

        <h2 className="heading pt-2 ps-2">Shopping Bag</h2>
      </div>
      <div className="row">
        <div className="col-md-9">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <UserCartSummary />
      </div>
    </div>
  );
}

export default UserCart;
