import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/input';
import { signUpUser } from '../../redux/slices/authentication';
import CustomLink from '../../components/link';
import CustomBtn from '../../components/button';
import CustomAlert from '../../components/alert';

import './style.css';

const Signup = ({ header }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('123456');
  const [email, setEmail] = useState('harisbinrehan@gmail.com');
  const [mobile, setMobile] = useState('03104106129');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { signUpError } = useSelector((state) => state.authentication);

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
      })
      .catch((error) => {
        <CustomAlert
          variant="danger"
          alertText={error}
          className="auth-alert"
        />;
      });
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end">
        {signUpError && (
          <CustomAlert
            variant="danger"
            alertText={signUpError}
            className="auth-alert"
          />
        )}
        {signupSuccess && (
        <CustomAlert
          variant="success"
          alertText={signUpError}
          className="auth-alert"
        />
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
