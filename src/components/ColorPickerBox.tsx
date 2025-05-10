type Props = {
  label: string;
  color: string;
  onChange: (newColor: string) => void;
  id: string;
};

export default function ColorPickerBox({
  label,
  color,
  onChange,
  id,
}: Props) {
  return (
    <div className="flex flex-col w-full mt-2 gap-2">
      <label className="text-sm font-medium text-[#6B7684] font-['Montserrat'] leading-tight">
        {label}
      </label>
      <label
        htmlFor={id}
        className="cursor-pointer flex flex-1 items-center gap-2 bg-[#F9FAFB] border-[1.8px] border-[#E2E7EB] rounded-lg px-3 py-3"
      >
        <div
          className="w-6 h-6 rounded-md border-[1.8px] border-[#0000001A]"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-[#191F28] font-medium font-['Montserrat'] leading-tight">
          {color}
        </span>
        <input
          id={id}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
      </label>
    </div>
  );
}
