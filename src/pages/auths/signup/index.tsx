import { Button, Input, InputPassword } from "../../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dataQueryStatus } from "../../../utils/dataQueryStatus";
import Alert from "../../../components/ui/alert";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState(IDLE);
  // const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const signUp = (data: any) => {
    setStatus(LOADING);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
        userCredentials;
        setStatus(SUCCESS);
      })
      .catch((err) => {
        err;
        setStatus(ERROR);
      });
  };

  // const signUp = async (data: any) => {
  //   setStatus(LOADING);
  //   setMessage("");
  //   axios({
  //     method: apiQueryMethods?.POST,
  //     // url: apiUrls?.register,
  //     data,
  //   })
  //     .then((resp) => {
  //       setStatus(SUCCESS);
  //       reset();
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 2000);
  //     })
  //     .catch((err) => {
  //       setAlert(true);
  //       setMessage(err.response.data.message);
  //       setStatus(ERROR);
  //     });
  // };

  const onSubmit = (data: any) => signUp(data);

  return (
    <>
      <div className="login-container">
        <div className="heading">
          <h3>Welcome to Incover!</h3>
          <p className="type2">Let’s get you started</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Input
            placeholder="Enter first name"
            label="First Name"
            name="firstName"
            register={register}
            required
            hasError={errors.firstName ? true : false}
          />
          <Input
            placeholder="Enter last name"
            label="Last Name"
            name="lastName"
            register={register}
            required
            hasError={errors.lastName ? true : false}
          /> */}
          <Input
            placeholder="Enter email address"
            label="Email Address"
            name="email"
            pattern="/^\S+@\S+$/i"
            register={register}
            required
            hasError={errors.email ? true : false}
          />
          {/* <Input
            placeholder="08123456789"
            label="Phone number"
            name="phoneNumber"
            type="tel"
            register={register}
            required
            hasError={errors.phoneNumber ? true : false}
          /> */}

          <InputPassword
            placeholder="Enter password"
            label="Create Password"
            // onChange={setPassword}
            name="password"
            register={register}
            required
            minLength={6}
            hasError={errors.password ? true : false}
          />
          {/* <PasswordStrengthIndicator password={password} /> */}
          <Button
            text="Register"
            className="login-button"
            isLoading={status === LOADING ? true : false}
          />
        </form>
        <p className="type2">
          Already have an acoount?{" "}
          <Link
            style={{ color: "#2EBB55", textDecoration: "underline" }}
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
      {alert && (
        <Alert title="{message}" text="" timeOut={3000} alertOut={setAlert} />
      )}
    </>
  );
};

export default Signup;
