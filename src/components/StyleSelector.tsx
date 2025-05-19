import { ButtonStyle } from "@/types";
import Image from "next/image";

type StyleSelectorProps = {
  selected: ButtonStyle;
  onSelect: (style: ButtonStyle) => void;
};

export default function StyleSelector({
  selected,
  onSelect,
}: StyleSelectorProps) {
  const styles: ButtonStyle[] = ["Point", "Box"];
  return (
    <div className="flex w-full gap-3">
      {styles.map((style) => {
        const isSelected = selected === style;
        return (
          <button
            key={style}
            onClick={() => onSelect(style)}
            className={`relative flex-1 flex flex-col items-center justify-center w-[96px] h-[72px] bg-white rounded-xl border transition-all
                ${
                  isSelected
                    ? "border-[#369AFF] shadow-[0_0_0_4px_rgba(54,154,255,0.1)]"
                    : "border-[#E2E7EB]"
                }`}
          >
            {style === "Point" ? (
              <Image
                src={"/images/style_point.png"}
                alt={`${style} icon`}
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={"/images/style_box.png"}
                alt={`${style} icon`}
                width={24}
                height={24}
              />
            )}
            <span
              className={`mt-2 text-sm font-medium ${
                isSelected
                  ? "text-[#191F28]"
                  : "text-[#8B95A1]"
              }`}
            >
              {style}
            </span>
          </button>
        );
      })}
    </div>
  );
}
