import { useDispatch } from 'react-redux';
import {
  Container, Image, Navbar, NavDropdown,
} from 'react-bootstrap';
import userImage from '../../assets/images/userImage.jpeg';
import Bell from '../../assets/images/Bag.svg';

import { logout } from '../../redux/slices/authentication'; // Import loginUser action

import './style.css';

function CustomNavbar() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar-sticky-section">
      <Navbar expand="lg">
        <Container>
          <h2 className="ecom">Q-Commerce</h2>
          <Navbar.Toggle> </Navbar.Toggle>
          <Navbar.Collapse className="justify-content-end">
            <img
              src={Bell}
              alt="Bell Icon"
              className="notification-icon mx-3"
            />
            <NavDropdown title={user.username} className="user-name">
              <NavDropdown.Item href="/" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Image
              src={userImage}
              alt="User Image"
              className="user-image mx-3"
              roundedCircle
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default CustomNavbar;
