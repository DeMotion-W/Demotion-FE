export interface Demo {
  id: number;
  title: string;
  date: string;
}

export interface DemoCardProps {
  id: number;
  title: string;
  date: string;
  thumbnailUrl?: string;
}

export type DemoCardWithMenuProps = DemoCardProps & {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export type ScreenshotData = {
  screenshotId: number;
  fileUrl: string;
  order: number;
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
  description: string;
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
