import { Table } from 'react-bootstrap';

import Arrow from '../../../assets/images/Arrow-up-down.svg';
import productImage from '../../../assets/images/product.png';

const TopSelling = () => {
  console.log('Implementing top selling products');

  return (
    <div>
      <div className="table-body w-100 h-100 p-4">
        <div className="main-div d-flex">
          <h2 className="pt-3 pb-2">Top Selling Products</h2>
        </div>

        <div>
          <Table>
            <thead>
              <tr className="table-secondary mt-3">
                <th>Image</th>
                <th>
                  Name
                  <img src={Arrow} alt="Arrow Icon" className="ps-2" />
                </th>
                <th>Stock</th>
                <th>units</th>
                <th>
                  Amount
                  <img src={Arrow} alt="Arrow Icon" className="ps-1" />
                </th>
                <th>
                  Date
                  <img src={Arrow} alt="Arrow Icon" className="ps-1" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="product-text">
                <td>
                  <img
                    className=""
                    src={productImage}
                    alt="thumbnail"
                    height="40px"
                  />
                </td>
                <td className="pt-3">
                  <b>Haris</b>
                </td>
                <td className="pt-3">34</td>
                <td className="pt-3">69(sold)</td>
                <td className="pt-3">1200</td>
                <td className="pt-3">21 July 1947</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
