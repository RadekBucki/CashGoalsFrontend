/* eslint-disable no-param-reassign */
import { defineStore } from 'pinia';

import { Modal } from '@/components/Modal/types.ts';

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
    showModal(modal: Modal) {
      if (modal.type === undefined) {
        modal.type = 'info';
      }
      this.modal = modal;
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
  },
});
