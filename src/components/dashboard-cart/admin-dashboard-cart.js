import Cart from '../../assets/images/shopping_cart.svg';

const DashboardCart = ({
  cartText, totalOrders, totalUnits, totalSale,
}) => (
  <div className="dashboard-cart-main-div container">
    <img src={Cart} alt="Cart Icon" className="m-2 ps-2" />
    <b className="">{cartText}</b>
    <div className="d-flex justify-content-around pt-2">
      <div className="m-2">
        <span>Total Orders: </span>
        <b className="ps-1">{totalOrders}</b>
      </div>
      <div className="m-2">
        <span>Total Units: </span>
        <b className="ps-1">{totalUnits}</b>
      </div>
    </div>
    <div className="d-flex m-2 ps-1 ms-4">
      <span>Total Sale: </span>
      <b className="ps-1">{totalSale}</b>
    </div>
  </div>
);

export default DashboardCart;
