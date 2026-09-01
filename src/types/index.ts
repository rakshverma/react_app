export interface InputProps {
  label?: string;
  name: string;
  type?: string;
  register?: any;
  error?: any;
  placeholder?: string;
  className: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validationObj?: any;
  multiple?: boolean;
  value?: any;
  readOnly?: boolean;
}

export interface SelectProps {
  label: string;
  name: string;
  className: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  register: any;
  validationObj?: any;
  options: any[];
  error: any;
  disabled?: boolean;
  multiple?: boolean;
  selectDisabled?: boolean;
}

export interface TextareaProps {
  label: string;
  name: string;
  className: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register: any;
  validationObj?: any;
  rows: number;
  error: any;
}

export interface RegisterFormData {
  formState: any;
  name: string;
  email: string;
  phone: number;
  password: string;
  confPassword: string;
  secretCode: string;
}

export interface LoginFormData {
  formState: any;
  email: string;
  password: string;
  confPassword?: string;
  secretCode?: string;
}
