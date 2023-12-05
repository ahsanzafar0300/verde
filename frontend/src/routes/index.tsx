import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import {
  DoctorDashboard,
  DoctorSignIn,
  DoctorSignUp,
  Page404,
  PatientSignIn,
  PatientSignUp,
} from "../pages";
import PublicRoutes from "./PublicRoutes";
import Navbar from "../components/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AppLayout />}>
        <Route element={<PublicRoutes />}>
          <Route path="patient/sign-in" element={<PatientSignIn />} />
          <Route path="patient/sign-up" element={<PatientSignUp />} />
          <Route path="doctor/sign-in" element={<DoctorSignIn />} />
          <Route path="doctor/sign-up" element={<DoctorSignUp />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="doctor-dashboard" element={<DoctorDashboard />} />
        </Route>
      </Route>
      <Route path="/*" element={<Page404 />} />
    </>
  )
);
