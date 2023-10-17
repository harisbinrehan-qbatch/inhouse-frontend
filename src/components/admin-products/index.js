/* eslint-disable max-len */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { debounce } from 'lodash';
import Arrow from '../../assets/images/Arrow-up-down.svg';
import Pencil from '../../assets/images/Pencil-square.svg';
import ProductImage from '../../assets/images/product.png';
import PaginationComponent from '../pagination';
import Trash from '../../assets/images/Trash.svg';
import { fetchProducts } from '../../redux/slices/products';

import CustomAlert from '../alert';
import Loading from '../loading';
import ProductsHeading from './admin-products-heading';
import CustomForm from '../input';

import './style.css';

const Products = () => {
  const products = useSelector((state) => state.products.data);
  const { isProductError } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleSearch = debounce((e) => {
    dispatch(fetchProducts(e.target.value));
  }, 500);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [page]);

  return (
    <div className="table-body w-100 p-4">
      <ProductsHeading />
      {isProductError ? (
        <>
          <CustomAlert
            variant="danger"
            alertText="There was an error fetching the products."
          />
          <div className="d-flex justify-content-end mx-5">
            <PaginationComponent />
          </div>
        </>
      ) : (
        <>
          <div className="header-buttons">
            <b className="fs-5 mt-2">Search :</b>
            <CustomForm
              style={{ marginTop: '-20px' }}
              placeholder="Search by name"
              className="mx-3"
              // value={searchTerm}
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
            <>
              <Table>
                <thead>
                  <tr className="table-secondary ">
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
                    <tr className="product-text" key={doc.id}>
                      <td>
                        <img
                          src={ProductImage}
                          alt="thumbnail"
                          className="product-image mx-2"
                        />
                        {doc.name || ''}
                      </td>
                      <td>{doc.size}</td>
                      <td>{doc.color}</td>
                      <td>{doc.price || 0}</td>
                      <td>{doc.quantity}</td>
                      <td>
                        <img
                          src={Pencil}
                          alt="pen"
                          className="mx-2"
                          style={{ cursor: 'pointer' }}
                        />
                        <img
                          src={Trash}
                          alt="trash"
                          className="mx-2"
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-end mx-5">
                <PaginationComponent />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
