import logo from "../assets/Logo.png";
import { FiPhoneCall } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-8 bg-white flex justify-between items-center border-b-2">
      <img src={logo} alt="Logo Image" className="w-32" />
      <div className="flex gap-3 items-center">
        <button className="py-1.5 px-6 rounded-[30px] btn-back text-white flex items-center gap-2">
          <FiPhoneCall />
          Help
        </button>
        <div className="border-2 border-[#3FB946] flex gap-2 py-1.5 px-3 rounded">
          <FaUserAlt className="text-[#125DB9] text-lg" />
          <BiChevronDown className="text-[#125DB9] text-lg" />
        </div>
      </div>
    </nav>
  );
}
