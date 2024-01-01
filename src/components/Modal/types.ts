export type StandardModal = {
  title: string;
  content?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  closeable?: boolean;
  onClose?: () => void;
};

export type QuestionModal = {
  title: string;
  type: 'question';
  onConfirm?: () => void;
  onClose?: () => void;
}

export type Modal = StandardModal | QuestionModal;
