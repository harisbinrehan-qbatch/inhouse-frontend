import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CustomBtn from '../button';
import productImage from '../../assets/images/product.png';
import { addToCart } from '../../redux/slices/cart';

import './style.css';

const UserProductsDisplay = ({ product }) => {
  const { cart } = useSelector((state) => state.cart);
  console.log('The cart is :', cart);
  const dispatch = useDispatch();

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <div className="m-4 ms-3 p-4 user-products-display-main-div">
        <div className="d-flex">
          <img
            src={productImage}
            alt="product"
            className="user-products-display-image"
          />
          <div className="">
            <div className="p-3">{product.name}</div>
            <div className="ps-3">
              Color
              <div className="d-flex p-2 pe-3">
                {['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'].map(
                  (color, index) => (
                    <div
                      className="square rounded"
                      key={index}
                      style={{ backgroundColor: color }}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="mt-1 ps-3 pe-3">
              <p className="">Size</p>
              <div className="d-flex">
                <div className="size rounded">XS</div>
                <div className="size rounded">S</div>
                <div className="size rounded">M</div>
                <div className="size rounded">L</div>
                <div className="size rounded">XL</div>
                <div className="size rounded">2XL</div>
                <div className="size rounded">3XL</div>
              </div>
              <div className="d-flex ps-1 mt-3">
                <p>Price:</p>
                <p>{product.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex pt-5 justify-content-end">
          <Link to="/shopping-bag">
            <CustomBtn btnText="Add to cart" onClick={handleAddToCart} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProductsDisplay;
