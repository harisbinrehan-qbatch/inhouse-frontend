import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert'; // Import the Alert component from React Bootstrap
import Form from '../../components/input';
import { signUpUser } from '../../redux/slices/authentication';
import CustomLink from '../../components/link';
import CustomBtn from '../../components/button';

import './style.css';

const Signup = ({ header }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('123456');
  const [email, setEmail] = useState('harisbinrehan@gmail.com');
  const [mobile, setMobile] = useState('03104106129');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(''); // Added signupError state
  const { signUpMessage } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const handleSignUp = () => {
    const body = {
      username,
      password,
      email,
      mobile,
    };
    dispatch(signUpUser(body))
      .then(() => {
        setSignupSuccess(true);
        setSignupError('');
        navigate('/'); // Navigate to the '/' route
      })
      .catch((error) => {
        setSignupSuccess(false);
        setSignupError(error.message); // Set the error message
      });
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end">
        {signupError && (
          <Alert variant="danger" className="auth-alert">
            {signupError}
          </Alert>
        )}
        {signupSuccess && (
          <Alert variant="success" className="auth-alert">
            {signUpMessage}
          </Alert>
        )}
      </div>
      <div className="login-rectangle">
        <h2 className="header">{header}</h2>
        <div className="border">
          <div className="login-fields">
            <Form
              placeholder="Full Name"
              label="Full Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-fields">
            <Form
              placeholder="email address"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-fields">
            <Form
              placeholder="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-fields">
            <Form
              placeholder="mobile number"
              label="Mobile"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="login-fields">
            <CustomBtn
              btnText="Signup"
              size="default"
              className="w-100"
              onClick={handleSignUp}
            />
          </div>
          <div className="login-fields text-center">
            <div className="login-links">
              <CustomLink
                text="Already have an account! "
                textLinkable="Login"
                link="/"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
