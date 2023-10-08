import { defineStore } from 'pinia';

export default defineStore('loader', {
  state: () => ({
    visible: false as boolean,
  }),
  actions: {
    showLoader() {
      this.visible = true;
    },
    hideLoader() {
      this.visible = false;
    },
  },
});
