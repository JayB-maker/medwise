import { ReactNode } from "react";
import "./AuthLayout.scss";

const AuthLayout = (props: { children: ReactNode }) => {
  const path = window.location.pathname;
  const { children } = props;

  return (
    <>
      <div className="layout-container">
        {/* <div className="left-layout-div">
          <div className="inner-left-div">
            <img
              src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666277111/enterprise-dashboard/Vector_fyxruo.png"
              alt="vector"
              className="background-vector"
            />
            <img
              src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666004168/internal-dashboard/logo-white_gtteri.png"
              alt="dropper-logo"
              className="dropper-logo"
            />
          </div>
        </div> */}
        <div className="right-layout-div">{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
