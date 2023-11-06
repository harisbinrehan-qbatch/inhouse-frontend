import {
  useEffect, useState, Suspense, lazy,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserProducts } from '../../redux/slices/products';
import CustomBtn from '../button';

import './style.css';
import Loading from '../loading';

const UserProductsDisplay = lazy(() => import('../user-products-display'));

const UserProducts = () => {
  const products = useSelector((state) => state.products.data);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProducts());
  }, []);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const productComponents = products.map((product) => (
    <div className="product-div p-3" key={product.id}>
      <img
        src={`http://localhost:5000/${product.images[0]}`}
        alt="product"
        className="user-product-image p-2"
      />
      <p className="p-1 flex-wrap w-100">{product.name}</p>
      <div className="d-flex ps-1">
        <p>Price:</p>
        <p>{product.price}</p>
      </div>
      <div className="d-flex ps-1">
        <p>Size:</p>
        <p className="ps-2">{product.size}</p>
      </div>
      <div className="d-flex justify-content-end">
        {product.quantity === 0 ? (
          <div
            className=""
            style={{
              color: 'white',
              background: 'red',
              height: '35px',
              borderRadius: '3px',
            }}
          >
            <strong
              style={{ fontStyle: 'italic' }}
              className="d-flex ps-2 pe-2 pt-1 justify-content-around"
            >
              Out of Stock
            </strong>
          </div>
        ) : (
          <CustomBtn
            btnText="Details"
            onClick={() => showProductDetails(product)}
          />
        )}
      </div>
    </div>
  ));

  return (
    <div className="d-flex ps-5 pt-3">
      {products.length === 0 ? (
        <div className="d-flex ps-5 justify-content-end empty-state-page">
          No products found.
        </div>
      ) : (
        <>
          <div className="d-flex gap-5 p-4 flex-wrap user-products-main-div">
            {productComponents}
          </div>

          <Suspense fallback={<Loading />}>
            <UserProductsDisplay product={selectedProduct} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default UserProducts;
