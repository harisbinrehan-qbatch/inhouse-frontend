import Offcanvas from 'react-bootstrap/Offcanvas';
import { Empty } from 'antd';
import arrowLeft from '../../assets/images/Arrow left.svg';

const ImportBulkErrorsCanvas = ({ show, setShow, errors }) => {
  const handleClose = () => {
    setShow(false);
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
            style={{ cursor: 'pointer' }}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="offcanvas-header.custom-offcanvas-header">
          <Offcanvas.Header>
            <Offcanvas.Title>Uploaded File errors</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            {errors?.length !== 0 ? (
              <div>
                <p>1- Hi</p>
                <p>2- Bye</p>
              </div>
            ) : (
              <Empty description="No Errors found" />
            )}
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default ImportBulkErrorsCanvas;
