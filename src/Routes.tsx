import {
  LoginPage,
  NotFoundPage,
  OTPVerificationPage,
  ResetPasswordPage,
  SetNewPasswordPage,
  SignupPage,
} from "./pages";
import OverviewPage from "./components/dashboard/overviewPage";
import PatientsPage from "./components/dashboard/patientsPage/generalPage";
import DoctorsPage from "./components/dashboard/doctorsPage/generalPage";
import AppointmentsPage from "./components/dashboard/appointmentsPage/generalPage";
import PaymentsPage from "./components/dashboard/paymentsPage/generalPage";
import DepartmentsPage from "./components/dashboard/departmentsPage/generalPage";
import DoctorsPageDetails from "./components/dashboard/doctorsPage/detailsPage/Details";
import PatientsPageDetails from "./components/dashboard/patientsPage/detailsPage/details";

export const routes = [
  {
    title: "Overview",
    subRoutes: [],
    icon: "dashboard",
    component: <OverviewPage />,
    route: "/",
  },
  {
    title: "Patient",
    subRoutes: [],
    icon: "dashboard",
    component: <PatientsPage />,
    route: "/patients/",
  },
  {
    title: "Patient",
    subRoutes: [],
    icon: "dashboard",
    component: <PatientsPageDetails />,
    route: "/patients/:id",
  },
  {
    title: "Doctor",
    subRoutes: [],
    icon: "dashboard",
    component: <DoctorsPage />,
    route: "/workers/",
  },
  {
    title: "Doctor",
    subRoutes: [],
    icon: "dashboard",
    component: <DoctorsPageDetails />,
    route: "/workers/:id",
  },
  {
    title: "Appointment",
    subRoutes: [],
    icon: "dashboard",
    component: <AppointmentsPage />,
    route: "/appointments/",
  },
  {
    title: "Payment",
    subRoutes: [],
    icon: "dashboard",
    component: <PaymentsPage />,
    route: "/payments/",
  },
  {
    title: "Department",
    subRoutes: [],
    icon: "dashboard",
    component: <DepartmentsPage />,
    route: "/departments/",
  },
  {
    title: "Login",
    subRoutes: [],
    icon: "dashboard",
    component: <LoginPage />,
    route: "/login/",
  },
  {
    title: "Signup",
    subRoutes: [],
    icon: "dashboard",
    component: <SignupPage />,
    route: "/signup/",
  },
  {
    title: "ResetPassword",
    subRoutes: [],
    icon: "dashboard",
    component: <ResetPasswordPage />,
    route: "/reset-password/",
    hide: true,
  },
  {
    title: "SetNewPassword",
    subRoutes: [],
    icon: "dashboard",
    component: <SetNewPasswordPage />,
    route: "/new-password/",
    hide: true,
  },
  {
    title: "Verification",
    subRoutes: [],
    icon: "dashboard",
    component: <OTPVerificationPage />,
    route: "/verification/",
    hide: true,
  },
  {
    title: "NotFound",
    subRoutes: [],
    icon: "dashboard",
    component: <NotFoundPage />,
    route: "*",
    hide: true,
  },
];
