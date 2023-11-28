/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Table } from 'react-bootstrap';

import { Empty } from 'antd';
import Arrow from '../../assets/images/Arrow-up-down.svg';
import Pencil from '../../assets/images/Pencil-square.svg';
import ProductsPaginationComponent from '../../components/products-pagination';
import Trash from '../../assets/images/Trash.svg';
import {
  deleteProduct,
  fetchAdminProducts,
  setPageOne,
  setShow,
  setUpdateCanvasShow,
  incrementPage,
  decrementPage,
  setLimit,
  setAnyPage,
} from '../../redux/slices/products';

import CustomForm from '../../components/input';
import CustomBtn from '../../components/button';
import AddProductCustomCanvas from '../../components/admin-add-product-canvas';

import './style.css';

const colorMap = {
  '#155724': 'green',
  '#AAA': 'grey',
  '#1B1E21': 'black',
  '#231579': 'blue',
  '#740F0F': 'red',
};

function getColorName(hexCode) {
  if (hexCode) {
    const color = colorMap[hexCode];
    return color || '';
  }
  return '';
}

const Products = () => {
  const products = useSelector((state) => state.products.data);
  const [currentProductId, setCurrentProductId] = useState();
  const { show, updateCanvasShow } = useSelector((state) => state.products);
  const {
    page, editSuccess, deleteSuccess, addSuccess, limit, totalCount,
  } = useSelector((state) => state.products);

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

  const handleSetPageOne = () => {
    dispatch(setPageOne());
  };

  const PageChangeFunction = (newPage) => {
    dispatch(setAnyPage(newPage));
  };

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [page, limit, addSuccess, editSuccess, deleteSuccess]);

  const handleSearch = debounce((e) => {
    handleSetPageOne();
    const search = e.target.value;
    dispatch(fetchAdminProducts({ search }));
  }, 500);

  return (
    <div>
      <div className="table-body w-100 h-100 p-4">
        <div className="main-div d-flex">
          <h2 className="heading">Products</h2>
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

        <div>
          {products.length !== 0 ? (
            <>
              <Table>
                <thead>
                  <tr className="table-secondary mt-3">
                    <th>Image</th>
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
                          className=""
                          src={`http://localhost:5000/${doc.images[0]}`}
                          alt="thumbnail"
                          height="40px"
                        />
                      </td>
                      <td className="pt-4">
                        <b>{doc.name}</b>
                      </td>
                      <td className="pt-4">{doc.size}</td>
                      <td className="pt-4">{getColorName(doc.color)}</td>
                      <td className="pt-4">{doc.price || 0}</td>
                      <td className="pt-4">{doc.quantity}</td>
                      <td>
                        <img
                          src={Pencil}
                          alt="pen"
                          className="mx-2 pt-4"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleUpdateClick(doc._id)}
                        />
                        <img
                          src={Trash}
                          alt="trash"
                          className="mx-2 pt-4"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleDeleteProduct(doc._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-end pe-3">
                <ProductsPaginationComponent
                  page={page}
                  limit={limit}
                  totalCount={totalCount}
                  onNextPage={() => dispatch(incrementPage())}
                  onPrevPage={() => dispatch(decrementPage())}
                  onPageChange={PageChangeFunction}
                  onLimitChange={(newLimit) => {
                    dispatch(setLimit(newLimit));
                    handleSetPageOne();
                  }}
                />
              </div>
            </>
          ) : (
            <Empty className="pt-5 mt-5" description="No products found" />
          )}
        </div>
      </div>
      {show && (
        <AddProductCustomCanvas header="Add Product" btnText="Add Product" />
      )}
      {updateCanvasShow && (
        <AddProductCustomCanvas
          header="Update Product"
          btnText="Update Product"
          _id={currentProductId}
          selectedProduct={products.find(
            (product) => product._id === currentProductId,
          )}
        />
      )}
    </div>
  );
};

export default Products;
