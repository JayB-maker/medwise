import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navbarDetails, patientNavDetails } from "../../../data/navDetails";
import MedwiseLogo from "../../../assets/medwise-logo.svg";
import MedwiseIcon from "../../../assets/medwise-icon.svg";
import { LOCAL_STORAGE_KEYS } from "../../../helpers/localStorageKeys";

export interface ILayoutProps {
  isSidebarExpanded?: any;
  setIsSidebarExpanded?: any;
  userImage?: any;
  firstLetter?: any;
  lastLetter?: any;
  children?: any;
  clickedIndex?: any;
  setClickedIndex?: any;
  pageTitle?: any;
  pageSubTitle?: any;
}

const LayoutSidebar = (props: ILayoutProps) => {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    clickedIndex,
    setClickedIndex,
  } = props;
  const path = window.location.pathname;

  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const userDetails: any = localStorage.getItem(
      LOCAL_STORAGE_KEYS.USER_DETAILS
    );
    const parsedUserDetails = JSON.parse(userDetails);
    setUserRole(parsedUserDetails?.role);
  }, []);

  // Load the data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("clicked");
    if (savedData) {
      setClickedIndex(parseInt(savedData));
    }
  }, [setClickedIndex]);

  // Save the data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clicked", clickedIndex.toString());
  }, [clickedIndex]);

  // const toggle = (index: any) => {
  //   if (clickedIndex === index) {
  //     setClickedIndex(navbarDetails.length + 1);
  //   } else {
  //     setClickedIndex(index);
  //   }
  // };

  return (
    <>
      <div className={`sidebar ${isSidebarExpanded ? "" : "expanded"}`}>
        <div className="sidebar-content">
          <div className="logo-container">
            <Link to="/">
              <img
                src={`${isSidebarExpanded ? MedwiseLogo : MedwiseIcon}`}
                alt="Medwise"
                className={`${
                  isSidebarExpanded ? "full-logo w-[60%]" : "half-logo w-[60%]"
                }`}
              />
            </Link>
            <img
              src={`${
                isSidebarExpanded
                  ? "https://res.cloudinary.com/dm19qay3n/image/upload/v1666348929/enterprise-dashboard/arrow-left_ebdlvg.png"
                  : "https://res.cloudinary.com/dm19qay3n/image/upload/v1666348929/enterprise-dashboard/arrow-right_i8u0of.png"
              }`}
              alt="arrow"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="sidebar-toggle"
            />
          </div>
          <div className="navbars">
            {(userRole === "PATIENT" ? patientNavDetails : navbarDetails).map(
              (navbar, index) => (
                // navbar.subMenu ? (
                //   <>
                //     <div
                //       className="drop"
                //       onClick={() => toggle(index)}
                //       key={index}
                //     >
                //       <div className="navbar">
                //         <img
                //           src={
                //             navbar.path === path
                //               ? navbar.activeIconSRC
                //               : navbar.iconSRC
                //           }
                //           alt="Icon"
                //         />
                //         <h6 className={`${isSidebarExpanded ? "show" : "hide"}`}>
                //           {navbar.handle}
                //         </h6>
                //       </div>
                //       <img src="assets/arrow.svg" alt="arrow" className="arrow" />
                //     </div>
                //     {clickedIndex === index &&
                //       navbar.subMenu.map((submenu, index) => (
                //         <Link
                //           style={{ textDecoration: "none" }}
                //           className={`navbar sub ${
                //             submenu.path === path ? "active" : ""
                //           }`}
                //           to={submenu.path}
                //           key={index}
                //         >
                //           <h6
                //             className={`${isSidebarExpanded ? "show" : "hide"}`}
                //           >
                //             {submenu.handle}
                //           </h6>
                //         </Link>
                //       ))}
                //   </>
                // ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  className={`navbar ${navbar.path === path ? "active" : ""}`}
                  to={navbar.path}
                  key={index}
                >
                  <img
                    src={
                      navbar.path === path
                        ? navbar.activeIconSRC
                        : navbar.iconSRC
                    }
                    alt="medwise Icon"
                  />
                  <h6 className={`${isSidebarExpanded ? "show" : "hide"}`}>
                    {navbar.handle}
                  </h6>
                </Link>
              )
              // )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutSidebar;
