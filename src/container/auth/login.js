import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../redux/slices/authentication';
import CustomCheckbox from '../../components/checkbox';
import CustomLink from '../../components/link';
import CustomBtn from '../../components/button';
import CustomForm from '../../components/input';
import CustomAlert from '../../components/alert';

import './style.css';

const Login = ({ header }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('Haris Bin Rehan');
  const [password, setPassword] = useState('123456');
  const { loginError } = useSelector((state) => state.authentication);
  const { loginMessage } = useSelector((state) => state.authentication);
  const handleLogin = () => {
    const body = { username, password };
    dispatch(loginUser(body));
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        {loginError && (
          <CustomAlert
            variant="danger"
            alertText={loginMessage}
            className="auth-alert"
          />
        )}
      </div>

      <div className="login-rectangle">
        <h2 className="header">{header}</h2>
        <div className="border">
          <div className="login-fields">
            <CustomForm
              placeholder="Please enter your username"
              label="Enter Username"
              type="username"
              hint="Please enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
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
            <CustomCheckbox id="default-radio" label="Remember me" />
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
