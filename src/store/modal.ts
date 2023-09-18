import { defineStore } from 'pinia';

export type Modal = {
  title: string;
  content: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
};
export const useModalStore = defineStore('modal', {
  state: () => ({
    modal: {
      title: '',
      content: '',
      type: 'info',
      onClose: undefined,
    } as Modal,
    visible: false as boolean,
  }),
  actions: {
    showModal(modal: Modal) {
      this.modal = modal;
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
  },
});
