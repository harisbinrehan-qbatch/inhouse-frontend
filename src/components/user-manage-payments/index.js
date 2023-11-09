import Offcanvas from 'react-bootstrap/Offcanvas';
import arrowLeft from '../../assets/images/Arrow left.svg';
import MasterCard from '../master-card';

const ManagePaymentsCanvas = ({ show, setShow }) => {
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
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="offcanvas-header.custom-offcanvas-header">
          <Offcanvas.Header>
            <Offcanvas.Title>Payment Methods</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            <div className="d-flex flex-wrap gap-1 justify-content-around">
              <div style={{ width: '280px' }}>
                <MasterCard />
              </div>
              <div style={{ width: '280px' }}>
                <MasterCard />
              </div>
              <div style={{ width: '280px' }}>
                <MasterCard />
              </div>
              <div style={{ width: '280px' }}>
                <MasterCard />
              </div>

            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default ManagePaymentsCanvas;
