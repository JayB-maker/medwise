import { Button, InputPin } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/new-password/");
  };
  return (
    <>
      <div className="login-section">
        <div className="login-container">
          <h3>Enter verification code sent</h3>
          <p className="type2">
            Enter the code sent to the number you provided
          </p>
          <form className="form">
            <InputPin />
            <Button
              text="Verify"
              className="login-button"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
