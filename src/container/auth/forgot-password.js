// import { useNavigate } from 'react-router';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch

import CustomBtn from '../../components/button';
import CustomLink from '../../components/link';
import CustomForm from '../../components/input';
import { sendEmail } from '../../redux/slices/authentication';

import './style.css';

const ForgotPassword = ({ header }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authentication);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [email, setEmail] = useState('');

  const validateEmail = (inputEmail) => {
    if (isEmpty(inputEmail)) {
      setEmailSuggestions(['Email field cannot be empty.']);
      setIsEmailValid(false);
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(inputEmail);

      if (isValidEmail) {
        setEmailSuggestions(['']);
      } else {
        setEmailSuggestions(['Invalid email format']);
      }

      setIsEmailValid(isValidEmail);
    }
  };

  const handleForgotPassword = () => {
    dispatch(sendEmail({ email, token: user.token }));
  };

  return (
    <div className="login-rectangle">
      <h2 className="header">{header}</h2>
      <div className="border">
        <div className="login-fields">
          <CustomForm
            placeholder="Please enter your email"
            label="Enter Email"
            type="email"
            value={email}
            hint={(
              <span className={isEmailValid ? 'success-hint' : ''}>
                {emailSuggestions.join(' ')}
              </span>
            )}
            onChange={(e) => {
              const newEmail = e.target.value;
              setEmail(newEmail);
              validateEmail(newEmail);
            }}
          />
        </div>
        <div className="login-fields">
          <CustomBtn
            btnText="Forgot Password"
            size="default"
            className="w-100"
            disabled={!isEmailValid}
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
