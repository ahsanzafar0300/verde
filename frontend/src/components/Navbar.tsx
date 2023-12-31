import logo from "../assets/Logo.png";
import { FiPhoneCall } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flushUser } from "../redux/slices/userSlice.js";
import { RootState } from "../redux/store.js";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  return (
    <nav className="w-full py-4 px-8 bg-white flex justify-between items-center border-b-2">
      <img src={logo} alt="Logo Image" className="w-32" />
      <div className="flex gap-3 items-center">
        <button className="py-1.5 px-6 rounded-[30px] btn-back text-white flex items-center gap-2">
          <FiPhoneCall />
          Help
        </button>
        <div className="relative">
          <div
            className="border-2 border-[#3FB946] flex gap-2 py-1.5 px-3 rounded"
            onClick={() =>
              user?.token ? setShowDropdown((prev) => !prev) : {}
            }
          >
            <FaUserAlt className="text-[#125DB9] text-lg" />
            <BiChevronDown className="text-[#125DB9] text-lg" />
          </div>
          <div
            id="dropdown"
            className="absolute right-0 top-12 z-10 bg-white border-primary divide-y divide-blue-600 rounded-lg shadow w-20"
            style={{ display: showDropdown ? "block" : "none" }}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <span
                  className="block px-4 py-2 text-primary hover:bg-blue-600 hover:text-white cursor-pointer"
                  onClick={() => dispatch(flushUser())}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
