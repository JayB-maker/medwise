export const getErrorMessage = (error: any) => {
  const response = error?.response;
  const defaultMssg = "Something went wrong. Please try again.";
  const errorMessage =
    response?.status === 503
      ? defaultMssg
      : response?.data
      ? response?.data?.message
      : defaultMssg;

  return errorMessage;
};
