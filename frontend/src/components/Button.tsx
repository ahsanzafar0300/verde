import { twMerge } from "tailwind-merge";

const baseStyles =
  "bg-gradient-to-b from-[#125db9] to-[#092f5d] rounded-[20px] text-white font-semibold border-none py-2 px-4 w-full";

export default function Button({ title, className, onClick }: InputProps) {
  return (
    <button
      className={twMerge(`${baseStyles} ${className ?? ""}`)}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

type InputProps = {
  title: string;
  className?: any;
  onClick?: () => void;
};
