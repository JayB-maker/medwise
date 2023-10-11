import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import ScrollToTop from "./ScrollToTop";
import { getToken, getUser, storeToken, storeUser } from "./storage";
import { AppContext } from "./AppContext";
import { ClickedIndexContext } from "./helper/Context";
import { navbarDetails } from "./data/navDetails";

function App() {
  // const [user, setUser] = useState<{
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  // }>(getUser());

  // const [token, setToken] = useState(getToken());
  const [clickedIndex, setClickedIndex] = useState(navbarDetails.length + 1);

  // const updateUser = (data: any) => {
  //   storeUser(data);
  //   // setUser(data);
  // };

  // const updateToken = (token: any) => {
  //   storeToken(token);
  //   setToken(token);
  // };

  return (
    <>
      {/* <AppContext.Provider
        value={{
          // user,
          token,
          // updateUser,
          updateToken,
        }}
      > */}
      <ClickedIndexContext.Provider value={{ clickedIndex, setClickedIndex }}>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </ClickedIndexContext.Provider>
      {/* </AppContext.Provider> */}
    </>
  );
}

export default App;
