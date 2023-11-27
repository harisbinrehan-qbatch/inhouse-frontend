/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Image,
  Navbar,
  NavDropdown,
  Button,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useEffect, useState } from 'react';
import userImage from '../../assets/images/userImage.jpeg';
import { logout } from '../../redux/slices/authentication';
import {
  moveToCartFromNavbar,
  setCartSummaryNull,
  setOrderSuccess,
} from '../../redux/slices/cart';

import './style.css';
import CustomBtn from '../button';
import { getNotifications, readNotification } from '../../redux/slices/order';

function CustomNavbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const [markAsRead, setMarkAsRead] = useState(false);

  const { isAdmin, isUser, user } = useSelector(
    (state) => state.authentication,
  );

  const { userCart } = useSelector((state) => state.cart);

  const { notifications } = useSelector((state) => state.order);

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleMoveToCart = () => {
    dispatch(setOrderSuccess());
    dispatch(moveToCartFromNavbar());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCartSummaryNull());
    navigate('/');
  };

  const handleMarkAsRead = (notificationId) => {
    setMarkAsRead(true);
    dispatch(readNotification(notificationId));
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(getNotifications());
    setMarkAsRead(false);
  }, [markAsRead]);

  return (
    <div
      style={{ zIndex: '3', position: 'fixed', width: '100%' }}
      className="navbar-sticky-section"
    >
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
              <>
                <div className="navClass">
                  <div className="d-flex pe-3 ">
                    {isAdmin ? (
                      <DropdownButton
                        align="end"
                        variant="text"
                        title={(
                          <i
                            className="bi bi-bell"
                            style={{ color: '#007BFF' }}
                          >
                            {unreadNotificationsCount > 0 && (
                              <span className="notification-badge bg-primary">
                                {unreadNotificationsCount}
                              </span>
                            )}
                          </i>
                        )}
                      >
                        {unreadNotificationsCount > 0 ? (
                          notifications.map((notification) => (
                            <div className="navClass" key={notification.id}>
                              {notification.isRead === false ? (
                                <Dropdown.Item className="d-flex">
                                  <p className="pt-1">{notification.text}</p>
                                  <CustomBtn
                                    btnText="👀"
                                    variant="text"
                                    className=""
                                    onClick={() => handleMarkAsRead(notification._id)}
                                  />
                                </Dropdown.Item>
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <div className="no-notifications ps-4">
                            No notifications
                          </div>
                        )}
                      </DropdownButton>
                    ) : null}
                  </div>
                </div>
                {isUser ? (
                  <Link to="/user/shopping-bag">
                    <i className="bi bi-cart" onClick={handleMoveToCart}>
                      <span className="badge bg-primary">
                        {userCart?.products?.length || 0}
                      </span>
                    </i>
                  </Link>
                ) : null}
              </>
            ) : pathname !== '/auth/login' ? (
              <Button as={Link} to="/auth/login" variant="primary">
                Login
              </Button>
            ) : null}

            {isUser ? (
              <NavDropdown
                title={user?.username}
                id="basic-nav-dropdown"
                className="user-name ps-4"
              >
                <NavDropdown.Item>
                  <Link
                    to={{
                      pathname: '/user/user-orders',
                      search: `?userId=${user?.userId}`,
                    }}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Orders
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout} className="pt-3">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : isUser || isAdmin ? (
              <NavDropdown
                title={user?.username}
                id="basic-nav-dropdown"
                className="user-name ps-4"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
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
