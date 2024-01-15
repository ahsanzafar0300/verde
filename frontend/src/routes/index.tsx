import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import {
  AdminDashboardHome,
  AdminDoctorProfile,
  AdminDoctors,
  AdminHospitalProfile,
  AdminHospitals,
  AdminNewDoctor,
  AdminNewHospital,
  AdminPatientProfile,
  AdminPatients,
  AdminSignIn,
  AdminSignUp,
  DoctorProfile,
  DoctorSignIn,
  DoctorSignUp,
  ForgotPasswordCode,
  ForgotPasswordEmail,
  ForgotPasswordReset,
  Page404,
  PatientProfile,
  PatientSignIn,
  PatientSignUp,
} from "../pages";
import PublicRoutes from "./PublicRoutes";
import Navbar from "../components/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { USER_ROLES } from "../api/roles";
import Unauthorized from "../pages/Unauthorized";
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";
import AdminLayout from "./layouts/AdminLayout";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const RequireAuth = ({ role }: any) => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  return <>{user?.role === role ? <Outlet /> : <Unauthorized />}</>;
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
          <Route path="admin/sign-in" element={<AdminSignIn />} />
          <Route path="admin/sign-up" element={<AdminSignUp />} />
          <Route path="forgot-password">
            <Route path="1" element={<ForgotPasswordEmail />} />
            <Route path="2" element={<ForgotPasswordCode />} />
            <Route path="3" element={<ForgotPasswordReset />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<RequireAuth role={USER_ROLES.doctor} />}>
            <Route element={<DoctorLayout />} path="doctor-dashboard">
              <Route index element={<div>Doctor Home</div>} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
          </Route>
          <Route element={<RequireAuth role={USER_ROLES.patient} />}>
            <Route element={<PatientLayout />} path="patient-dashboard">
              <Route index element={<div>Patient Home</div>} />
              <Route path="profile" element={<PatientProfile />} />
            </Route>
          </Route>
          <Route element={<RequireAuth role={USER_ROLES.admin} />}>
            <Route element={<AdminLayout />} path="admin-dashboard">
              <Route index element={<AdminDashboardHome />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="doctors/:id" element={<AdminDoctorProfile />} />
              <Route path="patients" element={<AdminPatients />} />
              <Route path="patients/:id" element={<AdminPatientProfile />} />
              <Route path="hospitals" element={<AdminHospitals />} />
              <Route path="hospitals/:id" element={<AdminHospitalProfile />} />
              <Route path="doctors/add-new" element={<AdminNewDoctor />} />
              <Route path="hospitals/add-new" element={<AdminNewHospital />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/*" element={<Page404 />} />
    </>
  )
);
