/* eslint-disable @typescript-eslint/no-explicit-any */
type ValidationResult = string | boolean;
type ValidationRule =
  ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>);

export type Field = {
  label: string;
  name: string;
  rules?: ValidationRule[];
  validateOn?: 'lazy' | ('input' | 'blur' | 'submit') | 'input lazy' | 'blur lazy' | 'submit lazy' | 'lazy input' | 'lazy blur' | 'lazy submit'
  required?: boolean;
  type?: string;
};

export type TextWithLink = {
  textBefore: string;
  text: string;
  routeName: string;
};