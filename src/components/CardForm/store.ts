import { defineStore } from 'pinia';

export default defineStore('forms', {
  state: () => ({
    forms: {} as Record<string, Record<string, string>>,
  }),
  actions: {
    setForm(formName: string, form: Record<string, string>) {
      this.forms[formName] = form;
    },
    setFormValue(formName: string, key: string, value: string) {
      if (this.forms[formName]) {
        this.forms[formName][key] = value;
      }
    },
    getForm(formName: string) {
      return this.forms[formName] || null;
    },
    getFormValue(formName: string, key: string) {
      return this.forms[formName]?.[key] || null;
    },
  },
});
