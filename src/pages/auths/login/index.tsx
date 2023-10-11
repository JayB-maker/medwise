import "./Login.scss";
import { Button, Input, InputPassword } from "../../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { apiQueryMethods, apiUrls } from "../../../utils/api";
import Alert from "../../../components/ui/alert";
import { useAppContext } from "../../../AppContext";
import { dataQueryStatus } from "../../../utils/dataQueryStatus";
import API from "../../../utils/api/API";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [status, setStatus] = useState(IDLE);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const { updateToken } = useAppContext();

  const logIn = (data: any) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => console.log(userCredentials))
      .catch((err) => console.log(err));
  };

  // const logIn = async (data: any) => {
  //   setStatus(LOADING);
  //   setMessage("");
  //   API({
  //     method: apiQueryMethods?.POST,
  //     url: apiUrls?.logIn,
  //     data,
  //   })
  //     .then((resp) => {
  //       if (resp.data.isSuccess) {
  //         setStatus(SUCCESS);
  //         reset();
  //         const token = resp.data.jwtToken;
  //         updateToken(token);
  //         setTimeout(() => {
  //           navigate("/");
  //         }, 2000);
  //       } else {
  //         setStatus(ERROR);
  //         setMessage(resp.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       setMessage(err.response.data.message);
  //       setStatus(ERROR);
  //     });
  // };

  const onSubmit = (data: any) => logIn(data);

  return (
    <>
      <div className="login-container">
        <div className="heading">
          <h3>Login</h3>
          <p className="type2">
            Enter the following details to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            placeholder="Enter email address"
            label="Email Address"
            register={register}
            required
            hasError={errors.email ? true : false}
          />
          <InputPassword
            name="password"
            placeholder="Enter password"
            label="Password"
            register={register}
            required
            hasError={errors.password ? true : false}
          />
          <p className="type4">
            Can’t remember password?{" "}
            <Link
              style={{ color: "#006C33", textDecoration: "underline" }}
              to="/reset-password"
            >
              Recover
            </Link>
          </p>
          <Button
            text="Login"
            className="button"
            isLoading={status === "LOADING" ? true : false}
          />
        </form>
        <p className="type2">
          Don't have an acoount?{" "}
          <Link
            style={{ color: "#006C33", textDecoration: "underline" }}
            to="/signup"
          >
            Register
          </Link>
        </p>
      </div>
      {status === ERROR && (
        <Alert
          title="Error Login in"
          text={message}
          // timeOut={3000}
          alertOut={setStatus}
        />
      )}
    </>
  );
};

export default Login;
