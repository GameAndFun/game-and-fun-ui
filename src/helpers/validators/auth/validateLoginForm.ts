import type { LoginValidationErrors } from "./types";

export const validateUsername = (username: string) => {
  if (!username) return "Логін обов’язковий";
  if (username.length < 3) return "Логін має містити щонайменше 3 символи";
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "Пароль обов’язковий";
  if (password.length <= 3) return "Пароль має містити щонайменше 4 символів";
  return "";
};

export const validateLoginForm = (payload: LoginValidationErrors) => {
  return {
    username: validateUsername(payload.username),
    password: validatePassword(payload.password),
  };
};
