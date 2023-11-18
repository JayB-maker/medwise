// export const getErrorMessage = (error: any) => {
//   const response = error?.response;
//   const defaultMssg = "Something went wrong. Please try again.";
//   const errorMessage =
//     response?.status === 503
//       ? defaultMssg
//       : response?.data
//       ? response?.data?.message
//       : defaultMssg;

//   return errorMessage;
// };


import { AxiosError } from "axios";

export const getErrorMessage = (error: AxiosError | any) => {
  if (!error) {
    return "An error occured. Please try again!";
  }

  if (typeof error === "string") {
    return error;
  }
  if (error.message.toLowerCase().includes("network error")) {
    return "You are not connected to the internet. Please check your internet connection and try again.";
  }
  if (error.response) {
    return (
      error.response.data.message ||
      error.response.statusText ||
      error.response.data.Message
    );
  } else if (error.request) {
    return error.request;
  } else {
    return "Something went wrong. Please check your internet connection and try again.";
  }
};
