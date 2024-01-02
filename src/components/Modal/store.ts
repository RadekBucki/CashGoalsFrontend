/* eslint-disable no-param-reassign */
import { defineStore } from 'pinia';

import { Modal, QuestionModal, StandardModal } from '@/components/Modal/types.ts';

export default defineStore('modal', {
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
    showModal(modal: StandardModal) {
      if (modal.type === undefined) {
        modal.type = 'info';
      }
      this.modal = modal;
      this.visible = true;
    },
    showQuestionModal(modal: QuestionModal) {
      this.modal = modal;
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
  },
});
