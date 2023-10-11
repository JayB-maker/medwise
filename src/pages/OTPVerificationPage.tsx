import AuthLayout from "../components/ui/authLayout";
import OTPVerification from "./auths/otp";

const OTPVerificationPage = () => {
  return (
    <AuthLayout>
      <OTPVerification />
    </AuthLayout>
  );
};

export default OTPVerificationPage;
