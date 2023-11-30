/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react';
import { message } from 'antd';
import Modal from 'react-bootstrap/Modal';

import cloudImage from '../../assets/images/cloud-arrow-up.svg';
import CustomBtn from '../button';

import './style.css';

const CustomModal = ({ show, setShow, setImportBulkDiv }) => {
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleBrowseClick = () => {
    // Trigger file input click when Browse button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e) => {
    // Handle file selection logic for CSV files
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      // Process the CSV file as needed
      console.log('Selected CSV file:', selectedFile);
    } else {
      // Notify the user that only CSV files are allowed
      message.error('Please select a valid CSV file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Import Bulk Products
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="bulk-upload"
          onDragOver={handleDragOver}
        >
          <img src={cloudImage} alt="Cloud" className="mb-3" />
          <p className="text-style">
            Drag & drop files here
            <br />
            or
          </p>
          <CustomBtn btnText="Browse" onClick={handleBrowseClick} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelected}
            multiple
            accept=".csv"
          />
        </div>
        <Modal.Footer>
          <CustomBtn
            className="mt-3"
            btnText="Save"
            onClick={() => {
              setImportBulkDiv(true);
              handleClose();
            }}
          />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
