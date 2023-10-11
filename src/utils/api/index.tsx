const baseUrl = "http://devapiv2.boiibonline.ng/api";

export const apiUrls = {
  logIn: `${baseUrl}/AdminAccount/Login`,
  forgotPassword: `${baseUrl}/AdminAccount/ForgotPassword`,
  firm: `${baseUrl}/Firm/GetAllByFirmId`,
  vehicleInsuranceClaim: `${baseUrl}/VehicleInsuranceClaim/GetByFirmId`,
  vehiclePremiumPolicy: `${baseUrl}/VehiclePremiumPolicy/GetByFirmId`,
};

export const apiQueryMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
