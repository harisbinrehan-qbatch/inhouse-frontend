/* eslint-disable radix */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { decrementPage, incrementPage } from '../../redux/slices/products';

const PaginationComponent = ({
  page,
  limit,
  totalCount = 0,
  onNextPage,
  onPrevPage,
  onLimitChange,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / limit);

  const dispatch = useDispatch();

  const handleNextClick = () => {
    dispatch(incrementPage());
  };

  const handlePrevClick = () => {
    dispatch(decrementPage());
  };

  const handleLastPageClick = () => {
    const calculatedTotalPages = Math.ceil(totalCount / limit);
    if (calculatedTotalPages > 0) {
      onPageChange(calculatedTotalPages);
    }
  };

  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={onPrevPage} disabled={page === 1}>
          Previous
        </Pagination.Prev>
        {page !== 1 ? (
          <Pagination.Item onClick={() => handlePrevClick()}>
            {page - 1}
          </Pagination.Item>
        ) : null}
        <Pagination.Item active>{page}</Pagination.Item>

        {page !== totalPages ? (
          <Pagination.Item
            onClick={() => handleNextClick()}
            disabled={page === totalPages}
          >
            {page + 1}
          </Pagination.Item>
        ) : null}
        {page !== totalPages ? (
          <Pagination.Item disabled={page === totalPages}>...</Pagination.Item>
        ) : null}

        {page !== totalPages ? (
          <Pagination.Item
            onClick={() => handleLastPageClick()}
            disabled={page === totalPages}
          >
            {totalPages}
          </Pagination.Item>
        ) : null}

        <Pagination.Next onClick={onNextPage} disabled={page === totalPages}>
          Next
        </Pagination.Next>
      </Pagination>
      <div className="d-flex justify-content-center">
        <span>Items per page:</span>
        <select
          onChange={(e) => onLimitChange(parseInt(e.target.value))}
          value={limit.toString()}
        >
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
