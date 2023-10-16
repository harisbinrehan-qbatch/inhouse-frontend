import CustomBtn from '../../components/button';
import Form from '../../components/input';

import './style.css';

const NewPassword = ({ header }) => (
  <div className="">
    <h2 className="header">{header}</h2>
    <div className="login-rectangle">
      <div className="login-fields">
        <Form
          placeholder="enter new password"
          label="Enter New Password"
          type="text"
          hint="Password must contain Capital, small letter, number and symbols"
        />
        <Form
          placeholder="confirm password"
          label="Confirm Password"
          type="email"
          hint="Both passwords must be same"
        />
      </div>
      <div className="login-fields">
        <CustomBtn btnText="Reset Password" size="default" className="w-100" />
      </div>
    </div>
  </div>
);
export default NewPassword;
