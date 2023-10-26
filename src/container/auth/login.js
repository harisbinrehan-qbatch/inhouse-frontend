import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/authentication';
import CustomLink from '../../components/link';
import CustomBtn from '../../components/button';
import CustomForm from '../../components/input';

import './style.css';

const Login = ({ header }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('harisbinrehan@gmail.com');
  const [password, setPassword] = useState('123456');

  const navigate = useNavigate();

  const handleLogin = () => {
    const body = { email, password };
    dispatch(loginUser(body));
    navigate('/');
  };
  return (
    <div>

      <div className="login-rectangle">
        <h2 className="header">{header}</h2>
        <div className="border">
          <div className="login-fields">
            <CustomForm
              placeholder="Please enter your email"
              label="Enter Email"
              type="email"
              hint="Please enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autocomplete="new-password"
            />
          </div>
          <div className="login-fields">
            <CustomForm
              placeholder="Please enter password"
              label="Password"
              type="password"
              hint="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-fields">
            <CustomBtn
              to="/"
              btnText="Login"
              size="default"
              className="w-100"
              onClick={handleLogin}
            />
          </div>
          <div className="login-fields text-center">
            <div className="login-links">
              <CustomLink
                text="Forgot Password! "
                textLinkable="Reset"
                link="/forgotPassword"
              />
            </div>
            <div className="login-links">
              <CustomLink
                text="I don't have the account! "
                textLinkable="Signup"
                link="/signup"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
