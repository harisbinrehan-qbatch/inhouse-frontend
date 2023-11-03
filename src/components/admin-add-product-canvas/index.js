/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';

import CustomForm from '../input';
import CustomBtn from '../button';
import arrowLeft from '../../assets/images/Arrow left.svg';
import CloudBox from '../cloud-box/cloud-box';
import {
  setShow,
  addProduct,
  updateProduct,
  setUpdateCanvasShow,
} from '../../redux/slices/products';

import './style.css';

const AddProductCustomCanvas = ({
  header, btnText, _id, selectedProduct,
}) => {
  const { show, updateCanvasShow } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    _id,
    name: selectedProduct?.name || '',
    price: selectedProduct?.price || 0,
    size: selectedProduct?.size || '',
    color: selectedProduct?.color || '',
    quantity: selectedProduct?.quantity || 0,
  });

  const handleClose = () => {
    if (show) {
      dispatch(setShow());
    } else if (updateCanvasShow) {
      dispatch(setUpdateCanvasShow());
    }
  };

  const handleAddProduct = () => {
    const obj = {
      ...formData,
      images: selectedImages,
    };
    dispatch(addProduct({ obj }));
  };
  const handleUpdateProduct = () => {
    dispatch(updateProduct(formData));
  };

  return (
    <Offcanvas
      show={show || updateCanvasShow}
      onHide={handleClose}
      placement="end"
      className="custom-offcanvas"
      height={600}
    >
      <div className="d-flex add-product-header">
        <div>
          <img
            src={arrowLeft}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="offcanvas-header.custom-offcanvas-header">
          <Offcanvas.Header>
            <Offcanvas.Title>{header}</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="p-4">
          <CloudBox
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </div>
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            <div>
              <CustomForm
                label="Product Name"
                placeholder="Add product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="pt-2">
              Size
              <div className="d-flex pt-2 pb-2">
                {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(
                  (size, index) => (
                    <div
                      className={`size rounded p-1 ${
                        formData.size === size ? 'selected' : ''
                      }`}
                      key={index}
                      onClick={() => setFormData({ ...formData, size })}
                    >
                      {size}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="pt-2">
              Color
              <div className="d-flex pt-2 pb-2">
                {['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'].map(
                  (color, index) => (
                    <div
                      className={`square rounded ${
                        formData.color === color ? 'selected' : ''
                      }`}
                      key={index}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="pt-2">
              <CustomForm
                label="Price"
                placeholder="$00.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="pt-2">
              <CustomForm
                label="Quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
            <div className="d-flex justify-content-center pt-5">
              <CustomBtn
                btnText={btnText}
                className="d-flex custom-button justify-content-center p-2"
                size="sm"
                onClick={() => {
                  if (show) {
                    handleAddProduct();
                  } else if (updateCanvasShow) {
                    handleUpdateProduct();
                  }
                }}
              />
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default AddProductCustomCanvas;
