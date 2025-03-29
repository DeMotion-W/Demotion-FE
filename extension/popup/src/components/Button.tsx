import { ButtonHTMLAttributes } from "react";

type Props = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ label, ...props }: Props) {
  return (
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded mt-4"
      {...props}
    >
      {label}
    </button>
  );
}
