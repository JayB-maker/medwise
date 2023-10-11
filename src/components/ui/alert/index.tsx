import { useEffect, useState } from "react";
import "./Alert.scss";

interface AlertProps {
  alertClass?: string;
  title: string;
  text: string;
  show?: boolean;
  isDanger?: boolean;
  timeOut?: number;
  alertOut?: any;
  IDLE?: any;
}

const Alert = (props: AlertProps) => {
  const {
    alertClass,
    title,
    text,
    show = true,
    isDanger,
    timeOut,
    alertOut,
    IDLE,
  } = props;
  const [alert, setAlert] = useState(show);
  const [toggleDetails, setToggleDetails] = useState(false);

  useEffect(() => {
    if (timeOut) {
      setTimeout(() => {
        alertOut(IDLE);
      }, timeOut);
    }
  }, [timeOut]);

  return (
    <>
      {alert && (
        <div className="alert-component">
          <div
            className={`alert ${alertClass} ${
              isDanger ? "alert-danger-bg" : ""
            }`}
          >
            <img
              src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666004166/internal-dashboard/arrow-right_mquktn.png"
              alt="arrow right"
              className={`arrow ${toggleDetails && "turn"}`}
              onClick={() => setToggleDetails(!toggleDetails)}
            />
            <div className="close-wrapper">
              <p className="close-alert" onClick={() => alertOut(false)}>
                +
              </p>
            </div>
            <h1>{title}</h1>
            {toggleDetails && <p className="sub-heading">{text}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
