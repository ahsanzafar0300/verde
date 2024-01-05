export default function InputField({
  label,
  type,
  name,
  placeholder,
  onChange,
}: InputFieldProps) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => onChange(e)}
        className="block my-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-primary placeholder:text-blue-600 bg-transparent rounded-lg border border-primary appearance-none focus:outline-none peer"
      />
      <label className="absolute text-sm text-primary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] whitespace-nowrap bg-white px-2 peer-focus:px-2 text-primary peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {label}
      </label>
    </div>
  );
}

interface InputFieldProps {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  onChange: (e: React.SyntheticEvent) => void;
}
