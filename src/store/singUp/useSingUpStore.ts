import axios from "axios";
import { defineStore } from "pinia";
import { API_URL } from "@/store/constants";
import type { SignUpData, SignUpState } from "@/store/singUp/types";
import { useNotificationStore } from "@/store/notification/useNotification";

export const useSignUpStore = defineStore("signUp", {
  state: (): SignUpState => ({ error: null }),

  actions: {
    async signUp(userData: SignUpData) {
      this.error = null;

      try {
        const response = await axios.post(`${API_URL}/auth/signup5`, userData);

        const notificationStore = useNotificationStore();
        notificationStore.success("Registration successful");

        return response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || "Registration failed";
        const notificationStore = useNotificationStore();
        notificationStore.error("Registration failed");
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
