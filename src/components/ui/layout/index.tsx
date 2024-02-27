import { ReactNode, useContext, useEffect, useState } from "react";
import "./Layout.scss";
import LayoutSidebar from "./LayoutSidebar";
import LayoutHeader from "./LayoutHeader";
// import { navbarDetails } from "../../../data/navDetails";
import { ClickedIndexContext } from "../../../helper/Context";
import { useNavigate } from "react-router";

interface ILayoutProps {
  children: ReactNode;
  pageSubTitle?: string;
  pageTitle?: string;
}

const Layout = (props: ILayoutProps) => {
  const { children, pageSubTitle, pageTitle } = props;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  // const [clickedIndex, setClickedIndex] = useState(navbarDetails.length + 1);
  const { clickedIndex, setClickedIndex } = useContext(ClickedIndexContext);

  const [firstLetter] = useState("");
  const [lastLetter] = useState("");
  const [userImage] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      Navigate("/login ");
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <LayoutSidebar
        clickedIndex={clickedIndex}
        setClickedIndex={setClickedIndex}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
      />
      <LayoutHeader
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        children={children}
        firstLetter={firstLetter}
        lastLetter={lastLetter}
        userImage={userImage}
        pageSubTitle={pageSubTitle}
        pageTitle={pageTitle}
      />
    </div>
  );
};

export default Layout;
