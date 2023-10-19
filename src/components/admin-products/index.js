/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { Table } from 'react-bootstrap';
import Arrow from '../../assets/images/Arrow-up-down.svg';
import Pencil from '../../assets/images/Pencil-square.svg';
import ProductImage from '../../assets/images/product.png';
import PaginationComponent from '../pagination';
import Trash from '../../assets/images/Trash.svg';
import {
  deleteProduct,
  fetchProducts,
  setPageOne,
  setShow,
  setUpdateCanvasShow,
} from '../../redux/slices/products';

import CustomAlert from '../alert';
import Loading from '../loading';
import CustomForm from '../input';
import CustomCanvas from '../canvas';
import CustomBtn from '../button';

import './style.css';

const colorMap = {
  '#155724': 'green',
  '#AAA': 'grey',
  '#1B1E21': 'black',
  '#231579': 'blue',
  '#740F0F': 'red',
};
function getColorName(hexCode) {
  return colorMap[hexCode] || hexCode;
}
const Products = () => {
  const products = useSelector((state) => state.products.data);
  const [currentProductId, setCurrentProductId] = useState();
  const { productMessage } = useSelector((state) => state.products);
  const { show, updateCanvasShow } = useSelector((state) => state.products);
  const {
    page, isProductError, loading, editSuccess, deleteSuccess, addSuccess,
  } = useSelector(
    (state) => state.products,
  );

  const dispatch = useDispatch();
  const handleAddProductClick = () => {
    dispatch(setShow());
  };

  const handleUpdateClick = (productId) => {
    setCurrentProductId(productId);
    dispatch(setUpdateCanvasShow());
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [page, addSuccess, editSuccess, deleteSuccess]);

  const handleSetPageOne = () => {
    dispatch(setPageOne());
  };
  const handleSearch = debounce((e) => {
    handleSetPageOne();
    dispatch(fetchProducts(e.target.value));
  }, 500);

  return (
    <div>
      <div className="table-body w-100 h-100 p-4">
        <div className="main-div d-flex">
          <h2 className="products-header">Products</h2>
          <div className="header-buttons">
            <CustomBtn
              btnText="Add New"
              size="default"
              className="mx-2"
              onClick={handleAddProductClick}
            />
          </div>
        </div>
        <div className="header-buttons">
          <b className="fs-5 mt-2">Search :</b>
          <CustomForm
            style={{ marginTop: '-20px' }}
            placeholder="Search by name"
            className="mx-3"
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '500px' }}
          >
            <Loading />
          </div>
        ) : (
          <div>
            <Table>
              <thead>
                <tr className="table-secondary">
                  <th>
                    Name
                    <img src={Arrow} alt="Arrow Icon" className="ps-2" />
                  </th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>
                    Price
                    <img src={Arrow} alt="Arrow Icon" className="ps-1" />
                  </th>
                  <th>
                    Quantity
                    <img src={Arrow} alt="Arrow Icon" className="ps-1" />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((doc) => (
                  <tr
                    className="product-text"
                    key={doc.id}
                    style={{ backgroundColor: getColorName(doc.color) }}
                  >
                    <td>
                      <img
                        src={ProductImage}
                        alt="thumbnail"
                        className="product-image mx-2"
                      />
                      {doc.name}
                    </td>
                    <td>{doc.size}</td>
                    <td>{getColorName(doc.color)}</td>
                    <td>{doc.price || 0}</td>
                    <td>{doc.quantity}</td>
                    <td>
                      <img
                        src={Pencil}
                        alt="pen"
                        className="mx-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleUpdateClick(doc._id)}
                      />
                      <img
                        src={Trash}
                        alt="trash"
                        className="mx-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteProduct(doc._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {isProductError && (
              <div>
                <CustomAlert variant="danger" alertText={productMessage} />
              </div>
            )}
            <div className="d-flex justify-content-end pe-3">
              <PaginationComponent />
            </div>
          </div>
        )}
      </div>
      {show && <CustomCanvas header="Add Product" btnText="Add Product" />}
      {updateCanvasShow && (
        <CustomCanvas
          header="Update Product"
          btnText="Update Product"
          _id={currentProductId}
        />
      )}
    </div>
  );
};

export default Products;
