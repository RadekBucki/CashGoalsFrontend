export type Modal = {
  title: string;
  content?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  closeable?: boolean;
  onClose?: () => void;
};
