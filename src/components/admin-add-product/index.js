/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { setShow, addProduct } from '../../redux/slices/products';
import CustomForm from '../input';
import './style.css';
import CustomBtn from '../button';
import CloudBox from './temp';
import arrowLeft from '../../assets/images/Arrow left.svg';

const AddProduct = () => {
  const { show } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: 'Polo',
    price: '90',
    quantity: '10',
  });

  const handleClose = () => {
    dispatch(setShow());
  };

  const handleAddProduct = () => {
    dispatch(addProduct(formData));
  };

  return (
    <Offcanvas
      show={show}
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
          <Offcanvas.Header className="">
            <Offcanvas.Title className="">Add Product</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="p-4">
          <CloudBox />
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
                {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((size, index) => (
                  <div
                    className={`size rounded p-1 ${formData.size === size ? 'selected' : ''}`}
                    key={index}
                    onClick={() => setFormData({ ...formData, size })}
                  >
                    {size}
                  </div>
                ))}
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
                btnText="Save"
                className="d-flex custom-button justify-content-center p-2"
                size="sm"
                onClick={handleAddProduct}
              />
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default AddProduct;
