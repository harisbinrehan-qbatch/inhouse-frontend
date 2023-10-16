import product from '../../assets/images/product.png';
import CustomBtn from '../button';
import './style.css';

const UserProduct = () => (
  <div className="product-div p-3">
    <img src={product} alt="product" className="user-product-image p-2" />
    <p className="p-1">
      Cargo Trousers for Men - 6 Pocket Trousers - 6 Pocket Cargo Trousers in
      all Colors
    </p>
    <div className="d-flex ps-1">
      <p>Price:</p>
      <p>Rs.500</p>
    </div>
    <div className="d-flex justify-content-end">
      <CustomBtn btnText="Details" />
    </div>
  </div>
);

export default UserProduct;
