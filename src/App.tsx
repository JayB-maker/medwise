import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import ScrollToTop from "./ScrollToTop";
import { ClickedIndexContext } from "./helper/Context";
import { navbarDetails } from "./data/navDetails";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [clickedIndex, setClickedIndex] = useState(navbarDetails.length + 1);
  
  return (
    <>
      <AuthProvider>
        <ClickedIndexContext.Provider value={{ clickedIndex, setClickedIndex }}>
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
          <ToastContainer limit={2} />
        </ClickedIndexContext.Provider>
      </AuthProvider>
    </>
  );
}

export default App;
