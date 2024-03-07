import { useState, useEffect } from "react";

const DropdownField = ({
  name,
  options,
  placeholder,
  label,
  properties,
  error,
  setValue,
}: DropdownFieldProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");

  useEffect(() => {
    setValue(name, dropdownValue);
  }, [dropdownValue]);

  return (
    <div className="my-6">
      <div
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-primary w-full cursor-pointer outline-none font-medium rounded-lg border border-primary relative text-sm px-2.5 pt-4 pb-2.5 text-center flex justify-between items-center"
        onClick={() => setShowDropdown((prev) => !prev)}
        style={{ border: error ? "1px solid crimson" : "" }}
      >
        {/* Dropdown button{" "} */}
        <span
          style={{ color: error ? "crimson" : "" }}
          className="absolute text-sm text-primary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 text-primary peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}
        </span>
        <svg
          className="w-2.5 h-2.5 ms-3 absolute right-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        <p ref={properties}>
          {dropdownValue ? (
            dropdownValue
          ) : (
            <span className="opacity-90 font-medium">{placeholder}</span>
          )}
        </p>
        <div
          id="dropdown"
          className="absolute left-0 top-10 z-10 bg-white border-primary divide-y divide-blue-600 rounded-lg shadow w-full"
          style={{ display: showDropdown ? "block" : "none" }}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options?.map((option) => (
              <li>
                <span
                  className="block px-4 py-2 text-primary hover:bg-blue-600 hover:text-white"
                  onClick={() => setDropdownValue(option?.value)}
                >
                  {option?.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {error && (
        <small className="text-red-500 font-medium uppercase">
          {error?.message}
        </small>
      )}
    </div>
  );
};

export default DropdownField;

interface DropdownFieldProps {
  options: Option[];
  placeholder?: string;
  label: string;
  name: string;
  properties?: any;
  error?: any;
  setValue: any;
}

interface Option {
  label: string;
  value: string;
}
