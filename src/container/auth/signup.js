import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

  const handleSignUp = () => {
    const body = {
      username,
      password,
      email,
      mobile,
    };
    dispatch(signUpUser(body));
  };

  return (
    <div className="">
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
                link="/login"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
