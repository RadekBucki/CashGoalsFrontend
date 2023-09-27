import { defineStore } from 'pinia';

export default defineStore('forms', {
  state: () => ({
    forms: {} as Record<string, Record<string, string>>,
  }),
  actions: {
    setForm(formName: string, form: Record<string, string>) {
      this.forms[formName] = form;
    },
    getForm(formName: string) {
      return this.forms[formName] || null;
    },
  },
});
