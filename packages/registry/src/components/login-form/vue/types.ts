export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  class?: string;
  title?: string;
  description?: string;
  error?: string;
  loading?: boolean;
  forgotHref?: string;
  signupHref?: string;
}
