export type Modal = {
  title: string;
  content: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
};
