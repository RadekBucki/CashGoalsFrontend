import { defineStore } from 'pinia';

export default defineStore('forms', {
  state: () => ({
    forms: {},
  }),
  actions: {
    setForm(formName: string, form: never) {
      this.forms[formName] = form;
    },
    getForm(formName: string) {
      return this.forms[formName] || null;
    },
  },
});
