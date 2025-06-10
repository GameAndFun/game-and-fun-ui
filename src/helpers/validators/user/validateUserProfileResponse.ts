import type { AxiosError, AxiosResponse } from "axios";

export const validateUserProfileResponse = (
  response: AxiosResponse | AxiosError
) => {
  switch (response.status) {
    case 200:
      return { success: true, error: "" };

    case 401:
      return { success: false, error: "Потрібно авторизуватися." };

    case 403:
      return { success: false, error: "Немає доступу до цього ресурсу." };

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
