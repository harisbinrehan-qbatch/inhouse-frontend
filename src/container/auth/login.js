import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/slices/authentication';
import CustomLink from '../../components/link';
import CustomBtn from '../../components/button';
import CustomForm from '../../components/input';

import './style.css';

const Login = ({ header }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailSuggestions, setEmailSuggestions] = useState([]);

  const handleLogin = async () => {
    if (isEmailValid && email && password) {
      const body = { email, password };
      dispatch(loginUser(body));
    }
  };

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

  return (
    <div>
      <div className="login-rectangle">
        <h2 className="pb-3 header">{header}</h2>
        <div className="border">
          <div className="login-fields">
            <CustomForm
              placeholder="Please enter your email"
              className="pt-2"
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
            <CustomForm
              placeholder="Please enter password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-fields">
            <CustomBtn
              btnText="Login"
              size="default"
              className="w-100"
              onClick={handleLogin}
              disabled={!isEmailValid || !password}
            />
          </div>
          <div className="login-fields text-center">
            <div className="login-links">
              <CustomLink
                text="Forgot Password! "
                textLinkable="Reset"
                link="/auth/forgotPassword"
              />
            </div>
            <div className="login-links">
              <CustomLink
                text="I don't have an account! "
                textLinkable="Signup"
                link="/auth/signup"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
