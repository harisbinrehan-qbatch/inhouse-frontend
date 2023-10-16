import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementPage,
  incrementPage,
} from '../../redux/slices/products';

function PaginationComponent() {
  const currentPage = useSelector((state) => state.products.page);

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
      <Pagination.Item active onClick={() => handlePrevClick()}>
        {currentPage - 1}
      </Pagination.Item>
      <Pagination.Item>{currentPage}</Pagination.Item>
      <Pagination.Item active onClick={() => handleNextClick()}>
        {currentPage + 1}
      </Pagination.Item>
      <Pagination.Next onClick={() => handleNextClick()}>Next</Pagination.Next>
    </Pagination>
  );
}

export default PaginationComponent;
