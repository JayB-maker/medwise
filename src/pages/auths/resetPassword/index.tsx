import { useEffect, useState } from "react";
import { Button, Input } from "../../../components/ui";
import "./style/ResetPassword.scss";
import { useNavigate } from "react-router-dom";
import { dataQueryStatus } from "../../../utils/dataQueryStatus";
import { useForm } from "react-hook-form";
import { apiQueryMethods, apiUrls } from "../../../utils/api";
import API from "../../../utils/api/API";
import SuccessfulModal from "../../../components/ui/modal/successfulModal/SuccessfulModal";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const Reset = () => {
  // const [useEmail, setUseEmail] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    API({
      method: apiQueryMethods?.POST,
      url: apiUrls?.forgotPassword,
      data,
    })
      .then((resp) => {
        setStatus(SUCCESS);
        setMessage(resp.data.message);
      })
      .catch((err) => {
        setAlert(true);
        setMessage(err.response.data.message);
        setStatus(ERROR);
      });
  };

  const onSubmit = (data: any) => forgotPassword(data);

  return (
    <>
      <div className="login-section">
        <div className="login-container">
          <h3>Get your access back</h3>
          <p className="type2">
            Enter your registered <span>email</span>
            {/* <span>{useEmail ? "email" : "phone number"}</span> */}
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {/* {useEmail ? ( */}
            <>
              <Input
                label="Email Address"
                placeholder="Enter Email Address"
                name="email"
                register={register}
                required
                id="login"
                hasError={errors.email ? true : false}
              />
              <Button
                text="Recover Password"
                className="login-button"
                isLoading={status === LOADING ? true : false}
              />
            </>
          </form>
        </div>
      </div>
      {status === SUCCESS && (
        <SuccessfulModal
          onClick={() => navigate("/login/")}
          title="Successful"
          subTitle={message}
        />
      )}
    </>
  );
};

export default Reset;
