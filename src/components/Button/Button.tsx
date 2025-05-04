export default function Button({
  label,
  bgColor,
  textColor,
  width,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="py-3 px-6 text-center justify-center rounded-3xl text-base font-semibold font-['Montserrat'] leading-tight cursor-pointer"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        width: width || "auto",
      }}
    >
      {label}
    </button>
  );
}
