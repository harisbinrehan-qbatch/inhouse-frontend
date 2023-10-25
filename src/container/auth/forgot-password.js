import { useNavigate } from 'react-router';
import CustomBtn from '../../components/button';
import Form from '../../components/input';
import CustomLink from '../../components/link';
import './style.css';

const ForgotPassword = ({ header }) => {
  const navigate = useNavigate();
  return (
    <div className="login-rectangle">
      <h2 className="header">{header}</h2>
      <div className="border">
        <div className="login-fields">
          <Form
            placeholder="Please enter your email"
            label="Enter Email Address"
            type="email"
            hint="Enter a valid email address"
          />
        </div>
        <div className="login-fields">
          <CustomBtn
            btnText="Forgot Password"
            size="default"
            className="w-100"
            // to="/newPassword"
            onClick={() => navigate('/newPassword')}
          />
        </div>
        <div className="login-fields text-center login-links">
          <CustomLink
            text="No, I remember my password! "
            textLinkable="Login"
            link="/"
          />
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
