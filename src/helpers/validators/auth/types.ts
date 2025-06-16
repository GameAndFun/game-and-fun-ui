export interface LoginValidationErrors {
  username: string;
  password: string;
  auth?: string;
}

export interface RecoveryValidationErrors {
  email: string;
}
