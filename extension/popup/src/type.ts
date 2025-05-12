export interface CaptureData {
  image: string;
  x: number;
  y: number;
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
  buttonColor: string;
  buttonTextColor: string;
  buttonStyle: "Point" | "Box";
  positionX: number;
  positionY: number;
};
