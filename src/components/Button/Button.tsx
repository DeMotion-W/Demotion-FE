export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#333D4B] py-4 px-4 text-center justify-center rounded-3xl text-[#FFFFFF] text-base font-semibold font-['Montserrat'] leading-tight"
    >
      {label}
    </button>
  );
}
