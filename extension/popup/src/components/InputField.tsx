import { InputHTMLAttributes, forwardRef } from "react";

type Props = {
  label?: string;
  errorMessage?: string;
  rightComponent?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    { label, errorMessage, rightComponent, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="text-[#222222] text-base font-normal font-['Pretendard'] block mb-2 mt-3">
          {label}
        </label>
        <div className="w-full flex flex-col">
          <div className="relative w-full">
            <input
              ref={ref}
              {...props}
              className={`w-full p-3 text-[#222222] border-1 rounded-lg text-base font-normal font-['Pretendard'] focus:ring-1 ${
                errorMessage
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {rightComponent && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {rightComponent}
              </div>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default InputField;
