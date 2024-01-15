import { Link, Outlet } from "react-router-dom";
import doctorImg from "../../assets/doctor.png";

const links = [
  { title: "Dashboard", href: "/" },
  { title: "My Profile", href: "/profile" },
  { title: "Appointments", href: "#" },
  { title: "My Patients", href: "#" },
  { title: "Schedule Slots", href: "#" },
  { title: "Payment & Payouts", href: "#" },
];

const BASE_URL = "/patient-dashboard";

export default function PatientLayout() {
  return (
    <main className="grid grid-cols-12 my-8 mx-8 text-primary gap-8">
      <section className="col-span-4 pt-10 pb-5 h-fit border border-primary rounded-md relative">
        <div className="bg-[#FFF500] text-[#125DB9] font-bold px-2 py-1 absolute top-2 right-4 rounded">
          Pending Verification
        </div>
        <div className="py-1 px-4">
          <img
            src={doctorImg}
            alt="Doctor"
            className="w-36 h-36 rounded-full block mx-auto"
          />
          <p className="text-[#5C89D8] text-sm text-center font-semibold my-1">
            Doctor Name
          </p>
          <button className="block mx-auto my-3 py-0.5 px-2 text-base text-[#E02020] border-2 border-[#E02020]">
            Stop Accepting Appointments
          </button>
          <button className="block mx-auto my-3 py-0.5 px-2 text-base text-[#3FB946] border-2 border-[#3FB946]">
            Share My Booking Page
          </button>
        </div>
        <div className="mt-5">
          {links.map((link) => (
            <Link
              to={BASE_URL + link?.href}
              className="block py-0.5 px-8 border-y border-[#125DB94D]"
            >
              {link?.title}
            </Link>
          ))}
        </div>
      </section>
      <section className="col-span-8">
        <Outlet />
      </section>
    </main>
  );
}
