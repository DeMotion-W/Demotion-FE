import { useEffect } from "react";
import { ScreenshotData } from "@/types";

/**
 * 모든 스크린샷 이미지를 사전 로딩하여 브라우저 캐시에 얹는 훅
 */
export default function useImagePreloader(images: ScreenshotData[]) {
  useEffect(() => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img.fileUrl;
    });
  }, [images]);
}
