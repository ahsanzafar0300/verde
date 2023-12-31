import { FaGoogle } from "react-icons/fa";

export default function GoogleButton({ onClick }: InputProps) {
  return (
    <button
      onClick={onClick}
      className="google-btn-bg my-4 rounded-3xl text-white font-normal w-full py-2.5 text-sm flex justify-center items-center gap-2"
    >
      <FaGoogle /> Sign in with Google
    </button>
  );
}

interface InputProps {
  onClick: () => void;
}
