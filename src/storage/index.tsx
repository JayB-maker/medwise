export const storeToken = (token: any) => {
  return localStorage.setItem("token", token);
};

export const storeUser = (user: any) => {
  return localStorage.setItem("user", JSON.stringify(user));
};

let pathName = window.location.pathname;
let isAuthPath =
  pathName.includes("login") ||
  pathName.includes("signup") ||
  pathName.includes("new-password") ||
  pathName.includes("reset-password");

export const getUser = () => {
  let user = localStorage.getItem("user");
  return user
    ? JSON.parse(user || "{}")
    : !isAuthPath && (window.location.href = "/login/");
};

export const getToken = () => {
  let token = localStorage.getItem("token");
  return token
    ? token || ""
    : (!isAuthPath && (window.location.href = "/login/")) || "";
};
