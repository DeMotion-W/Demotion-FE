export function toRgbaWithAlpha(
  color: string,
  alpha: number
): string {
  if (color.startsWith("rgba")) {
    const [r, g, b] = color
      .match(/rgba?\(([^)]+)\)/)?.[1]
      .split(",")
      .map((v) => v.trim()) ?? ["0", "0", "0"];
    return `rgba(${r},${g},${b},${alpha})`;
  } else if (color.startsWith("rgb")) {
    const [r, g, b] = color
      .match(/rgb\(([^)]+)\)/)?.[1]
      .split(",")
      .map((v) => v.trim()) ?? ["0", "0", "0"];
    return `rgba(${r},${g},${b},${alpha})`;
  } else if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(0,0,0,${alpha})`;
}

// lib/color.ts
export function toRgbString(color: string): string {
  if (color.startsWith("rgb")) {
    return (
      color
        .match(/\(([^)]+)\)/)?.[1]
        .split(",")
        .slice(0, 3)
        .map((v) => v.trim())
        .join(",") ?? "0,0,0"
    );
  }

  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  return "0,0,0";
}
