export interface IButton {
  onClick?: () => void;
  disabled?: boolean;
  text: React.ReactNode;
  styles?: string | boolean;
}
