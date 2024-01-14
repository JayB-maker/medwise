import "./Login.scss";
import { Button } from "../../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { dataQueryStatus } from "../../../utils/dataQueryStatus";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { LOCAL_STORAGE_KEYS } from "../../../helpers/localStorageKeys";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/helpers";
import CustomSelect from "../../../components/ui/customHTMLElements/CustomSelect";
import CustomInputField from "../../../components/ui/customHTMLElements/CustomInputField";
import { fireBaseLogout } from "../../../components/ui/layout/LayoutHeader";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const Login = () => {
  const { register, handleSubmit, control, reset } = useForm();

  const navigate = useNavigate();

  const [status, setStatus] = useState(IDLE);
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const fetchUser = async (userCredentials: any, collection: string) => {
    console.log(collection, "coll");
    // const patient: any = [];
    try {
      const docSnap = await getDoc(
        doc(db, collection, `${userCredentials?.user?.uid}`)
      );
      if (docSnap.exists()) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.USER_DETAILS,
          JSON.stringify({ ...docSnap.data(), id: docSnap.id })
        );

        localStorage.setItem(
          LOCAL_STORAGE_KEYS.USER,
          JSON.stringify(userCredentials)
        );
        localStorage.setItem(LOCAL_STORAGE_KEYS.IS_USER_EXIST, "true");

        localStorage.setItem(
          LOCAL_STORAGE_KEYS.USER_BIO_DATA_ID,
          userCredentials._tokenResponse?.idToken
        );

        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("Logged in successfully");
        // setStatus(DATAMODE);
      } else {
        fireBaseLogout();
        toast.error(
          "No patient data match the credential provided, check your internet and try again"
        );
      }
    } catch (error: any) {
      if (error.code === "unavailable") {
        // Firebase error code for network issues
        setStatus(ERROR);

        toast.error("Check your network and try again later");
      } else {
        setStatus(ERROR);
        toast.error(getErrorMessage(error.message));
      }
    }
  };

  const logIn = async (data: any) => {
    setStatus(LOADING);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials: any) => {
        console.log(userCredentials);
        console.log(userCredentials._tokenResponse?.idToken);
        setStatus(SUCCESS);
        reset();
        fetchUser(userCredentials, data.role);
      })
      .catch((err) => {
        setStatus(ERROR);
        toast.error(getErrorMessage(err.message));
      });
  };

  const onSubmit = (data: any) => logIn(data);

  const handleChange = (target: any, name: any) => {
    setDetails({ ...details, [name]: target?.value });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

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
          <div className="flex flex-col gap-6">
            <CustomInputField
              type="text"
              label="Email"
              {...register("email")}
              required
              onChange={(e: any) => handleInputChange(e)}
            />
            <CustomInputField
              type="password"
              label="Password"
              {...register("password")}
              required
              onChange={(e: any) => handleInputChange(e)}
            />
            <CustomSelect
              placeholder="Role"
              options={[
                { label: "Patient", value: "patients" },
                { label: "Worker", value: "workers" },
              ]}
              control={control}
              name="role"
              handleChange={(e, a) => handleChange(e, a)}
              required
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
          </div>
        </form>
      </div>
      {/* {status === ERROR && (
        <Alert
          title="Error Login in"
          text={message}
          // timeOut={3000}
          alertOut={setStatus}
        />
      )} */}
    </>
  );
};

export default Login;
