import { Button, Input, InputPassword } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { dataQueryStatus } from "../../../utils/dataQueryStatus";
import axios from "axios";
import { apiQueryMethods, apiUrls } from "../../../utils/api";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const SetNewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [status, setStatus] = useState(IDLE);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const forgotPassword = async (data: any) => {
    setStatus(LOADING);
    setMessage("");
    axios({
      method: apiQueryMethods?.POST,
      // url: apiUrls?.resetPassword,
      data,
    })
      .then((resp) => {
        setStatus(SUCCESS);
        reset();
        setTimeout(() => {
          navigate("/login/");
        }, 2000);
      })
      .catch((err) => {
        setAlert(true);
        setMessage(err.response.data.message);
        setStatus(ERROR);
      });
  };

  const onSubmit = (data: any) => forgotPassword(data);

  return (
    <div className="login-section">
      <div className="login-container">
        <h3>Set new password</h3>
        <p className="type2">Set a new password that you won’t forget easily</p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <InputPassword
            label="New password"
            placeholder="Enter New Password"
            name="password"
            register={register}
            required
            hasError = {errors.password ? true : false}
          />
          <Input
            label="OTP"
            placeholder="Enter OTP"
            name="otpCode"
            register={register}
            required
            hasError = {errors.otpCode ? true : false}
          />
          <Button
            text="Save new password"
            className="login-button"
            isLoading={status === LOADING ? true : false}
            // onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
