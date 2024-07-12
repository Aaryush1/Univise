export interface NavbarProps {
    isVisible: boolean;
    isPinned: boolean;
    onPinToggle: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }