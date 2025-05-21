export interface CaptureData {
  image: string;
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

export type PresignedResponse = {
  files: {
    originalFileName: string;
    uploadUrl: string;
    fileUrl: string;
  }[];
};

export type ScreenshotMetadata = {
  fileUrl: string;
  buttonText: string;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonStyle: "Point" | "Box";
  positionX: number;
  positionY: number;
};
