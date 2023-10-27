// import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { forgotPassword } from '../../redux/slices/authentication';

import CustomBtn from '../../components/button';
import Form from '../../components/input';
import CustomLink from '../../components/link';

import './style.css';

const ForgotPassword = ({ header }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);

  // Create a state variable to capture the email
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Call the handleForgotPassword function and pass the email
    dispatch(forgotPassword({ email, token: user.token }));
  };

  return (
    <div className="login-rectangle">
      <h2 className="header">{header}</h2>
      <div className="border">
        <div className="login-fields">
          <Form
            placeholder="Please enter your email"
            label="Enter Email Address"
            type="email"
            // Update the email state when the input changes
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-fields">
          <CustomBtn
            btnText="Forgot Password"
            size="default"
            className="w-100"
            // Pass the email to handleForgotPassword
            onClick={handleForgotPassword}
          />
        </div>
        <div className="login-fields text-center login-links">
          <CustomLink
            text="No, I remember my password! "
            textLinkable="Login"
            link="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
