import React from 'react';

import UserProduct from '../user-product';
import './style.css';

const UserProducts = () => {
  const productComponents = [];

  for (let index = 0; index < 50; index += 1) {
    productComponents.push(<UserProduct key={index} />);
  }

  return (
    <div className="ps-5">
      <div className="d-flex gap-5 p-4 flex-wrap user-products-main-div">
        {productComponents}
      </div>
    </div>
  );
};

export default UserProducts;
