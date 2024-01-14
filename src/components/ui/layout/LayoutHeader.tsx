import { useState } from "react";
import { ILayoutProps } from "./LayoutSidebar";
import { Link, useNavigate } from "react-router-dom";
import ImageAvatar from "../../../assets/avatar.png";
import NextIcon from "../../../assets/arrow-right-icon.svg";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../../firebase";


export const fireBaseLogout = async () => {
  await signOut(auth)
    .then(() => {
      // toast.success("logged out succesfully");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};


const LayoutHeader = (props: ILayoutProps) => {
  const {
    isSidebarExpanded,
    children,
    firstLetter,
    lastLetter,
    pageTitle,
    pageSubTitle,
    // userImage,
  } = props;

  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  const { logout } = useAuth();

  // const auth = getAuth();

  

  const handleLogout = () => {
    fireBaseLogout();
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className={`main-section ${isSidebarExpanded ? "" : "expanded"}`}>
        <div className={`header ${isSidebarExpanded ? "" : "expanded"}`}>
          <div className="flex items-center">
            <h1 className="text-[18px] leading-[28px] font-semibold text-[#4D5154] capitalize">
              {pageTitle}
            </h1>
            {pageSubTitle && (
              <>
                <img src={NextIcon} alt="" />
                <h1 className="text-[14px] leading-[20px] font-normal text-[#4D5154] capitalize">
                  {pageSubTitle}
                </h1>
              </>
            )}
          </div>
          <div className="notification-wrapper">
            <div className="profile">
              <div
                className="profile-pics"
                onClick={() => navigate("/settings")}
              >
                <img className="user-image" src={ImageAvatar} />
                <h4 style={{ color: "white" }}>{firstLetter + lastLetter}</h4>
              </div>
              <div className="profile-menu" onClick={() => setMenu(!menu)}>
                <span>Profile</span>
                <img
                  src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666004166/internal-dashboard/arrow_qev5ch.png"
                  alt="arrow"
                />
              </div>
              {menu && (
                <div className="menu-wrapper">
                  <Link
                    to="/settings"
                    className="menu-bar"
                    style={{ textDecoration: "none" }}
                  >
                    Profile
                  </Link>
                  <span className="menu-bar" onClick={() => handleLogout()}>
                    Logout
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="main-contents">{children}</div>
      </div>
    </>
  );
};

export default LayoutHeader;
