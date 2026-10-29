export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

export interface SignupFormProps {
  class?: string;
  title?: string;
  description?: string;
  error?: string;
  loading?: boolean;
  loginHref?: string;
}
