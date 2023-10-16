import { useDispatch, useSelector } from 'react-redux';

import AddProduct from '../admin-add-product';
import CustomBtn from '../button';
import CustomForm from '../input';
import { setShow } from '../../redux/slices/products';

import './style.css';

const ProductsHeading = () => {
  const { show } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddProductClick = () => {
    dispatch(setShow());
  };

  return (
    <div className="main-div d-flex">
      <h2 className="products-header">Products</h2>
      <div className="header-buttons">
        <b className="fs-5 mt-2">Search :</b>
        <CustomForm
          style={{ marginTop: '-20px' }}
          placeholder="search by name"
          className="mx-3"
        />
        <CustomBtn
          btnText="Import Bulk Products"
          size="default"
          className="mx-2"
        />
        <CustomBtn
          btnText="Add New"
          size="default"
          className="mx-2"
          onClick={handleAddProductClick}
        />
      </div>

      {show && <AddProduct />}
    </div>
  );
};

export default ProductsHeading;
