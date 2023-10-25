import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Image, Navbar, NavDropdown,
} from 'react-bootstrap';

import userImage from '../../assets/images/userImage.jpeg';
import CartIcon from '../../assets/images/Bag.svg';
import { logout } from '../../redux/slices/authentication'; // Import loginUser action

import './style.css';
import { setCartSummaryNull } from '../../redux/slices/cart';

function CustomNavbar() {
  const dispatch = useDispatch();

  const { isAdmin } = useSelector((state) => state.authentication);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCartSummaryNull());
  };

  return (
    <div style={{ zIndex: '3' }} className="navbar-sticky-section">
      <Navbar expand="lg">
        <Container>
          <h2 className="ecom">Q-Commerce</h2>
          <Navbar.Toggle> </Navbar.Toggle>
          <Navbar.Collapse className="justify-content-end">
            {!isAdmin && (
              <Link to="/shopping-bag">
                <img
                  src={CartIcon}
                  alt="Cart Icon"
                  className="notification-icon pb-1 pe-2"
                />
              </Link>
            )}
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
