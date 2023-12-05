import { FaGoogle } from "react-icons/fa";

export default function FacebookButton({ onClick }: InputProps) {
  return (
    <button
      onClick={onClick}
      className="facebook-btn-bg my-4 rounded-3xl text-white font-normal w-full py-2.5 text-sm flex justify-center items-center gap-2"
    >
      <FaGoogle /> Sign in with Facebook
    </button>
  );
}

interface InputProps {
  onClick: () => void;
}
