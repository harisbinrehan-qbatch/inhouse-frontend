import CustomProgressBar from '../progress-bar';

import CustomBtn from '../button';
import Cross from '../../assets/images/close.svg';

const ImportBulk = ({ setShow, handleCloseBulk }) => {
  const handleViewErrors = () => {
    setShow(true);
  };
  return (
    <div className="container import-bulk-div">
      <div className="d-flex justify-content-between">
        <b className="d-flex mt-2">Uploaded File Status</b>
        <img
          style={{ cursor: 'pointer' }}
          src={Cross}
          alt="Arrow Left"
          className="pe-2 pt-2"
          onClick={handleCloseBulk}
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <div>
          <p>File Name:</p>
          <p style={{ color: 'grey' }} className="d-flex mb-3">
            Bulk-July.CSV
          </p>
        </div>
        <div>
          <div className="d-flex">
            <p>File Status: </p>
            <b style={{ color: 'grey' }} className="d-flex mb-3 ms-2">
              In-Progress
            </b>
          </div>
          <div className="mt-1">
            <CustomProgressBar />
          </div>
        </div>

        <div>
          <p>Total Products:</p>
          <b
            style={{ color: 'blue' }}
            className="d-flex mb-3 justify-content-center"
          >
            452
          </b>
        </div>
        <div>
          <p>Successful:</p>
          <b
            style={{ color: 'green' }}
            className="d-flex mb-3 justify-content-center"
          >
            410
          </b>
        </div>
        <div>
          <p>Errors:</p>
          <b
            style={{ color: 'red' }}
            className="d-flex mb-3 justify-content-center"
          >
            42
          </b>
        </div>

        <CustomBtn
          btnText="View Errors"
          variant="outline-primary"
          className="mt-4"
          onClick={handleViewErrors}
        />
      </div>
    </div>
  );
};

export default ImportBulk;
