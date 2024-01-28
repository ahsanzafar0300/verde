import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="h-[80vh] flex justify-center items-center gap-4">
      <div className="w-36">
        <Link
          to="patient/sign-in"
          className="form-btn py-3 px-4 block text-center"
        >
          Patients
        </Link>
      </div>
      <div className="w-36">
        <Link
          to="doctor/sign-in"
          className="form-btn py-3 px-4 block text-center"
        >
          Doctor
        </Link>
      </div>
      <div className="w-36">
        <Link
          to="admin/sign-in"
          className="form-btn py-3 px-4 block text-center"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
