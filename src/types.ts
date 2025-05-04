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
