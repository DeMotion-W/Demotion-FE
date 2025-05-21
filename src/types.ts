export interface Demo {
  demoId: number;
  title: string;
  firstScreenshotUrl: string;
  createdAt: string;
}

export type DemoCardWithMenuProps = Demo & {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export type DemoEditProps = {
  title: string;
  subtitle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  screenshots: ScreenshotData[];
  setTitle: (value: string) => void;
  setSubtitle: (value: string) => void;
  setButtonBgColor: (value: string) => void;
  setButtonTextColor: (value: string) => void;
  setScreenshots: (value: ScreenshotData[]) => void;
  setMode: (mode: "edit" | "preview") => void;
};

export type ScreenshotData = {
  screenshotId: number;
  fileUrl: string;
  buttonText: string;
  buttonBgColor: string;
  buttonStyle: ButtonStyle;
  buttonTextColor: string;
  positionX: number;
  positionY: number;
};

export type DemoData = {
  demoId: number;
  title: string;
  subtitle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  screenshots: ScreenshotData[];
};

export interface ScreenshotButtonProps {
  positionX: number;
  positionY: number;
  buttonText: string;
  buttonBgColor: string;
  buttonTextColor: string;
  onClick?: () => void;
}

export type ButtonStyle = "Point" | "Box";

export interface ScreenshotStat {
  screenshotId: number;
  viewCount: number;
  avgDurationMillis: number;
}

export interface InsightData {
  viewCount: number;
  completionRate: number;
  screenshotStats: ScreenshotStat[];
}

export interface LeadsData {
  email: string;
  contactClicked: boolean;
}
