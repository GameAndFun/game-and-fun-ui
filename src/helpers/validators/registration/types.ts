export interface RegistrationData {
  name: string;
  surname: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}

export interface RegistrationValidationErrors {
  name: string;
  surname: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}
