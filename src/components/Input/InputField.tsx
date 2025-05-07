import {
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        <label className="justify-start text-[#191F28] text-sm font-medium font-['Pretendard'] leading-normal block mb-2 mt-3">
          {label}
        </label>
        <div className="flex flex-col">
          <div className="relative">
            <input
              ref={ref}
              {...props}
              type={
                isPassword && showPassword ? "text" : type
              }
              className={`w-full p-2 justify-center items-center text-[#222222] border-1 rounded-lg text-sm font-normal font-['Pretendard'] focus:ring-1 leading-relaxed ${
                errorMessage
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs mt-1">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
