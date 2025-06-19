import type { RegistrationData } from "@/helpers/validators/registration/types";

const validateName = (name: string) => {
  if (!name) return "Ім’я обов’язкове";
  if (name.length < 3) return "Ім’я має містити щонайменше 3 символи";
  return "";
};

const validateSurname = (surname: string) => {
  if (!surname) return "Прізвище обов’язкове";
  if (surname.length < 3) return "Прізвище має містити щонайменше 3 символи";
  return "";
};

const validatePhone = (phone: string) => {
  if (!phone) return "Телефон обов’язковий";

  const phoneRegex = /^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

  if (!phoneRegex.test(phone)) {
    return "Невірний формат телефону. Приклад: +38 (099) 999-99-99";
  }

  return "";
};

const validateEmail = (email: string) => {
  if (!email) return "Email обов’язковий";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return "Некоректний формат email";

  return "";
};

const validateUsername = (username: string) => {
  if (!username) return "Логін обов’язковий";
  if (username.length < 3) return "Логін має містити щонайменше 3 символи";
  return "";
};

const validatePassword = (password: string) => {
  if (!password) return "Пароль обов’язковий";
  if (password.length <= 3) return "Пароль має містити щонайменше 4 символів";
  return "";
};

export const validateRegistrationForm = (payload: RegistrationData) => {
  return {
    name: validateName(payload.name),
    surname: validateSurname(payload.surname),
    phone: validatePhone(payload.phone),
    email: validateEmail(payload.email),
    username: validateUsername(payload.username),
    password: validatePassword(payload.password),
  };
};
