import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decrementPage, incrementPage } from '../../redux/slices/products';

function PaginationComponent() {
  const currentPage = useSelector((state) => state.products.page);
  const { isProductError, data } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleNextClick = () => {
    dispatch(incrementPage());
  };

  const handlePrevClick = () => {
    dispatch(decrementPage());
  };

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => handlePrevClick()}
        disabled={currentPage === 1}
      >
        Previous
      </Pagination.Prev>
      {currentPage === 1 ? (
        <Pagination.Next active>0</Pagination.Next>
      ) : (
        <Pagination.Item active onClick={() => handlePrevClick()}>
          {currentPage - 1}
        </Pagination.Item>
      )}

      <Pagination.Item>{currentPage}</Pagination.Item>
      {isProductError ? (
        <Pagination.Next active>{currentPage + 1}</Pagination.Next>
      ) : (
        <Pagination.Item active onClick={() => handleNextClick()}>
          {currentPage + 1}
        </Pagination.Item>
      )}
      {isProductError || data.length < 7 ? (
        <Pagination.Next disabled>Next</Pagination.Next>
      ) : (
        <Pagination.Next onClick={() => handleNextClick()}>
          Next
        </Pagination.Next>
      )}
    </Pagination>
  );
}

export default PaginationComponent;
