import ProgressBar from 'react-bootstrap/ProgressBar';

const CustomProgressBar = () => (
  <ProgressBar>
    <ProgressBar striped variant="success" now={35} key={1} />
    <ProgressBar variant="warning" now={20} key={2} />
    <ProgressBar striped variant="danger" now={10} key={3} />
  </ProgressBar>
);

export default CustomProgressBar;
