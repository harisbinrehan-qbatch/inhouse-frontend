/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/button-has-type */
import React, { useRef, useState } from 'react';
import cloudImage from '../../assets/images/cloud-arrow-up.svg';
import CustomBtn from '../button';
import './style.css';

const CloudBox = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e) => {
    const newImages = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'));
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const handleImageDelete = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  return (
    <div
      className="upload-image"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img src={cloudImage} alt="Cloud" className="" />
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
        accept="image/*"
      />
      <div className="image-list">
        {selectedImages.length === 0 ? (
          <p className="d-flex text-style pt-3 ps-4">No images selected.</p>
        ) : (
          <div className="d-flex image-container pt-5 gap-2 flex-wrap justify-content-around">
            {selectedImages.map((image, index) => (
              <div key={index} className="image-item">
                <div className="image-container-relative">
                  <img
                    className="image-item"
                    src={URL.createObjectURL(image)}
                    alt={`Selected Image ${index + 1}`}
                  />
                  <button
                    onClick={() => handleImageDelete(index)}
                    className="delete-button"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudBox;
