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
      disabled={disabled}
      className={`w-full py-2 rounded-lg text-sm font-semibold font-['Pretendard'] transition-colors mt-6 ${
        disabled
          ? "bg-[#D0D7DD] text-[#FFFFFF] cursor-not-allowed"
          : "bg-[#369AFF] text-[#FFFFFF] hover:bg-blue-600"
      }`}
      {...props}
    >
      {label}
    </button>
  );
}
