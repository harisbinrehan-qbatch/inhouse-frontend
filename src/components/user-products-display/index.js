import product from '../../assets/images/product.png';
import CustomBtn from '../button';
import './style.css';

const UserProductsDisplay = () => (
  <div>
    <div className="m-4 ms-3 p-4 user-products-display-main-div">
      <div className="d-flex">
        <img
          src={product}
          alt="product"
          className="user-products-display-image"
        />
        <div className="">
          <div className="p-3">
            Cargo Trousers for Men - 6 Pocket Trousers - 6 Pocket Cargo Trouser
          </div>
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
              <p>Rs.500</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex pt-5 justify-content-end">
        <CustomBtn btnText="Add to cart" />
      </div>
    </div>
  </div>
);

export default UserProductsDisplay;
