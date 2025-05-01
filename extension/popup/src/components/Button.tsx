import { ButtonHTMLAttributes } from "react";

type Props = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  label,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={`w-full py-2 rounded-md text-sm font-semibold transition-colors mt-6 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
      {...props}
    >
      {label}
    </button>
  );
}
