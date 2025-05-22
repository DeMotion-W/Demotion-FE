import { ChromePicker } from "react-color";

type Props = {
  id: string;
  label: string;
  color: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (newColor: string) => void;
};

export default function ColorPickerBox({
  id,
  label,
  color,
  isOpen,
  onOpen,
  onClose,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col w-full mt-2 gap-2 relative">
      <label className="text-xs font-medium text-[#6B7684] font-['Montserrat'] leading-tight">
        {label}
      </label>

      <div
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="cursor-pointer flex items-center gap-2 bg-[#F9FAFB] border border-[#E2E7EB] rounded-lg px-3 py-3"
      >
        <div
          className="w-6 h-6 rounded-md border-[1.8px] border-[#0000001A]"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-[#191F28] font-medium font-['Montserrat'] leading-tight">
          {color}
        </span>
      </div>

      {isOpen && (
        <div
          className={`absolute top-full ${
            id === "bg-color-picker" ? "left-0" : "right-0"
          } mt-2 z-50`}
        >
          <ChromePicker
            color={color}
            onChangeComplete={(c) => onChange(c.hex)}
          />
        </div>
      )}
    </div>
  );
}
