/* eslint-disable no-nested-ternary */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Image, Navbar, NavDropdown, Button,
} from 'react-bootstrap';

import userImage from '../../assets/images/userImage.jpeg';
import CartIcon from '../../assets/images/Bag.svg';
import { logout } from '../../redux/slices/authentication';
import { setCartSummaryNull } from '../../redux/slices/cart';

import './style.css';

function CustomNavbar() {
  const dispatch = useDispatch();
  const { isAdmin, isUser, user } = useSelector(
    (state) => state.authentication,
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCartSummaryNull());
    navigate('/');
  };

  const handleNavigateHome = () => {
    if (!isUser && !isAdmin) {
      navigate('/');
    }
  };

  return (
    <div style={{ zIndex: '3' }} className="navbar-sticky-section">
      <Navbar expand="lg">
        <Container>
          <h2 className="ecom clickable" onClick={handleNavigateHome}>
            Q-Commerce
          </h2>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {isUser || isAdmin ? (
              isUser ? (
                <Link to="/shopping-bag">
                  <img
                    src={CartIcon}
                    alt="Cart Icon"
                    className="notification-icon pb-1 pe-2"
                  />
                </Link>
              ) : null
            ) : (
              <Button as={Link} to="/login" variant="primary">
                Login
              </Button>
            )}
            {isUser ? (
              <NavDropdown
                title={user?.username}
                id="basic-nav-dropdown"
                className="user-name ps-4"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item className="pt-3">
                  Orders
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={user?.username}
                id="basic-nav-dropdown"
                className="user-name ps-4"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {isUser || isAdmin ? (
              <Image
                src={userImage}
                alt="User Image"
                className="user-image mx-3"
                roundedCircle
              />
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
