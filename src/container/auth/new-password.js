import React, { useState } from 'react'; // Import React and useState
import { useDispatch } from 'react-redux';
import { notification } from 'antd';

import CustomBtn from '../../components/button';
import CustomForm from '../../components/input';
import { resetPassword } from '../../redux/slices/authentication';

import './style.css';

const NewPassword = ({ header }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Initially, assume passwords match

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(newConfirmPassword === password);
  };

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    if (passwordsMatch) {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');
      const body = {
        token,
        newPassword: password,
      };
      dispatch(resetPassword(body));
    } else {
      notification.error({
        message: 'Passwords must be same',
        type: 'error',
        duration: 2,
      });
    }
  };

  return (
    <div>
      <div className="login-rectangle">
        <h2 className="header">{header}</h2>
        <div className="border">
          <div className="login-fields">
            <CustomForm
              placeholder="Enter New Password"
              label="Enter New Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="login-fields">
            <CustomForm
              placeholder="Confirm New Password"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {!passwordsMatch && (
            <p className="d-flex ps-3 error-message" style={{ color: 'red' }}>
              Passwords do not match.
            </p>
          )}
          <div className="login-fields">
            <CustomBtn
              btnText="Reset Password"
              size="default"
              className="w-100"
              onClick={handleResetPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
