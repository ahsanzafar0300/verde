export default function RadioInput({
  label,
  name,
  options,
  onChange,
}: RadioInputProps) {
  return (
    <div className="my-3.5">
      <label className="text-xs text-primary duration-300 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {label}
      </label>
      <div className="flex justify-evenly mt-2">
        {options?.map((option) => (
          <div className="flex items-center me-4">
            <input
              type="radio"
              value={option.value}
              // name="inline-radio-group"
              name={name}
              onChange={onChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-primary">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

type Option = {
  label: string;
  value: string;
};

type RadioInputProps = {
  label: string;
  name: string;
  options: Option[] | undefined;
  onChange: (e: any) => void;
};
