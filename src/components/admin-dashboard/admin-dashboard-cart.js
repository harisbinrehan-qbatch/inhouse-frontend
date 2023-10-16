import Cart from '../../assets/images/shopping_cart.svg';
import './style.css';

const DashboardCart = ({
  cartText,
  totalProducts,
  totalOrders,
  totalUnits,
  totalSale,
}) => (
  <div className="dashboard-cart-main-div">
    <img src={Cart} alt="Cart Icon" className="m-2" />
    {cartText}
    <div className="d-flex">
      <div className="m-2">
        <span>Total Products </span>
        <b>{totalProducts}</b>
      </div>
      <div className="m-2">
        <span>Total Orders </span>
        <b>{totalOrders}</b>
      </div>
    </div>
    <div className="d-flex">
      <div className="m-2">
        <span>Total Units </span>
        <b>{totalUnits}</b>
      </div>
      <div className="m-2">
        <span>Total Sale </span>
        <b>{totalSale}</b>
      </div>
    </div>
  </div>
);

export default DashboardCart;
