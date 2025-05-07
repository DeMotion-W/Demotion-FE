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
      className={`w-full text-center py-4 rounded-md text-base font-semibold font-['Pretendard'] leading-tight transition-colors mt-6 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#369AFF] text-white hover:bg-[#197bde]"
      }`}
      {...props}
    >
      {label}
    </button>
  );
}
