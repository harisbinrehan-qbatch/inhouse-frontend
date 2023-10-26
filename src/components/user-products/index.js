import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/products';

import CustomBtn from '../button';
import productImage from '../../assets/images/product.png';

import './style.css';
import UserProductsDisplay from '../user-products-display';

const UserProducts = () => {
  const products = useSelector((state) => state.products.data);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedProduct(products[0]);
    dispatch(fetchProducts());
  }, [products]);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const productComponents = products.map((product) => (
    <div className="product-div p-3" key={product.id}>
      <img
        src={productImage}
        alt="product"
        className="user-product-image p-2"
      />
      <p className="p-1 flex-wrap w-100">{product.name}</p>
      <div className="d-flex ps-1">
        <p>Price:</p>
        <p>{product.price}</p>
      </div>
      <div className="d-flex justify-content-end">
        <CustomBtn
          btnText="Details"
          onClick={() => showProductDetails(product)}
        />
      </div>
    </div>
  ));

  if (products.length === 0) {
    return (
      <div className="d-flex ps-5 pt-3 ms-4">
        <h2 className="heading">No products found.</h2>
      </div>
    );
  }

  return (
    <div className="d-flex ps-5 pt-3">
      <div className="d-flex gap-5 p-4 flex-wrap user-products-main-div">
        {productComponents}
      </div>
      <UserProductsDisplay product={selectedProduct} />
    </div>
  );
};

export default UserProducts;
