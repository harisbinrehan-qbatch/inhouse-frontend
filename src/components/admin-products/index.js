import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Arrow from '../../assets/images/Arrow-up-down.svg';
import Pencil from '../../assets/images/Pencil-square.svg';
import ProductImage from '../../assets/images/product.png';
import PaginationComponent from '../pagination';
import Trash from '../../assets/images/Trash.svg';
import { fetchProducts } from '../../redux/slices/products';

import './style.css';
import CustomAlert from '../alert';
import Loading from '../loading';
import ProductsHeading from './admin-products-heading';

const Products = () => {
  const products = useSelector((state) => state.products.data);
  const { isProductError } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [page]);

  return (
    <div className="table-body w-100 p-4">
      {isProductError ? (
        <>
          <ProductsHeading />
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
          <ProductsHeading />
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
                <tbody className="w-100">
                  {products.map((doc) => (
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
