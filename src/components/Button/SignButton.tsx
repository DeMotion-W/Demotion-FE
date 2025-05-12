import { ButtonHTMLAttributes } from "react";

type Props = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SignButton({
  label,
  disabled,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled}
      className={`w-full text-center py-4 rounded-md text-base font-semibold font-['Pretendard'] leading-tight transition-colors mt-6 ${
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
