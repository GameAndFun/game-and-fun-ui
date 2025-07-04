import type { AxiosError, AxiosResponse } from "axios";

export const validateAuthResponse = (response: AxiosResponse | AxiosError) => {
  switch (response.status) {
    case 200:
      return { success: true, error: "" };

    case 400:
      return {
        success: false,
        error: "Помилка запиту. Перевірте введені дані.",
      };

    case 401:
      return { success: false, error: "Невірний логін або пароль." };

    case 500:
      return {
        success: false,
        error: "Внутрішня помилка сервера. Спробуйте пізніше.",
      };

    default:
      return {
        success: false,
        error: `Невідома помилка (код: ${response.status})`,
      };
  }
};
