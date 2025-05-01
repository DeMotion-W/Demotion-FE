import { CaptureData } from "../type";

interface Props {
  captures: CaptureData[];
  imgRefs: React.MutableRefObject<
    (HTMLImageElement | null)[]
  >;
  setCaptures: React.Dispatch<
    React.SetStateAction<CaptureData[]>
  >;
}

export default function CapturedImageList({
  captures,
  imgRefs,
  setCaptures,
}: Props) {
  return (
    <div className="w-full overflow-y-auto space-y-2">
      {captures.map((c, i) => (
        <div
          key={i}
          className="relative border rounded overflow-hidden flex justify-center items-center bg-white"
        >
          <img
            ref={(el: HTMLImageElement | null) => {
              imgRefs.current[i] = el;
            }}
            src={c.image}
            onLoad={(e) => {
              const img = e.currentTarget;
              setCaptures((prev) =>
                prev.map((cap, idx) =>
                  idx === i
                    ? {
                        ...cap,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                      }
                    : cap
                )
              );
            }}
            className="max-h-[200px] object-contain"
          />
          {c.width && c.height && imgRefs.current[i] && (
            <div
              className="absolute w-3 h-3 bg-red-500 rounded-full"
              style={{
                top: `${
                  (c.y * imgRefs.current[i]!.offsetHeight) /
                  c.height
                }px`,
                left: `${
                  (c.x * imgRefs.current[i]!.offsetWidth) /
                  c.width
                }px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
