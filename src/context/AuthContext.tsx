import { LOCAL_STORAGE_KEYS } from "../helpers/localStorageKeys";
import React, {
  useEffect,
  useReducer,
  createContext,
  useContext,
  useMemo,
} from "react";

interface Children {
  children: React.ReactNode;
}

type AuthContextType = {
  user: Record<string, any> | null;
  isUserExist: boolean;
  getCredentials: () => void;
  logout: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const initialState: AuthContextType = {
  user: null,
  isUserExist: false,
  logout: () => {},
  getCredentials: () => {},
  setIsLoggedIn: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

type ActionType =
  | { type: "GET-CREDENTIALS" }
  | { type: "SET-IS-LOGGED-IN"; payload: boolean }
  | { type: "LOGOUT" };

const reducer = (
  state: AuthContextType,
  action: ActionType
): AuthContextType => {
  if (typeof window === "undefined") {
    return state;
  }

  switch (action.type) {
    case "GET-CREDENTIALS":
      const user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || "";
      return {
        ...state,
        user: user ? JSON.parse(user) : null,
        isUserExist: Boolean(
          localStorage.getItem(LOCAL_STORAGE_KEYS.IS_USER_EXIST)
        ),
      };
    case "SET-IS-LOGGED-IN":
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.IS_USER_EXIST,
        String(action.payload)
      );
      return {
        ...state,
        isUserExist: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        isUserExist: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: Children): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValues: AuthContextType = useMemo(() => {
    return {
      user: state.user,
      isUserExist: state.isUserExist,
      getCredentials: () => dispatch({ type: "GET-CREDENTIALS" }),
      setIsLoggedIn: (payload: boolean) =>
        dispatch({ type: "SET-IS-LOGGED-IN", payload }),
      logout: () => dispatch({ type: "LOGOUT" }),
    };
  }, [state]);

  useEffect(() => {
    dispatch({ type: "GET-CREDENTIALS" });
  }, []);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);

export default AuthProvider;
