import router from "@/router";
import { defineStore } from "pinia";
import axios, { type AxiosError } from "axios";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { API_URL, USER_ROLE_ADMIN } from "@/store/constants";
import type { UpdatedUserInfo, UserState } from "@/store/user/types";
import { useNotificationStore } from "@/store/notification/useNotification";
import { validateUserProfileResponse } from "@/helpers/validators/user/validateUserProfileResponse";

export const useUserProfileStore = defineStore("userProfile", {
  state: (): UserState => ({
    userProfile: null,
  }),

  actions: {
    async logout() {
      this.userProfile = null;
      router.push({ name: "home" });
    },

    async fetchUserProfile() {
      try {
        const authStore = useAuthStore();

        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: { Authorization: authStore.accessToken },
        });

        const validation = validateUserProfileResponse(response);

        if (!validation.success)
          return useNotificationStore().error(validation.error);

        this.userProfile = response.data;
      } catch (error) {
        const validation = validateUserProfileResponse(error as AxiosError);
        useNotificationStore().error(validation.error);
      }
    },

    async updateUserProfile(userInfo: UpdatedUserInfo) {
      try {
        const authStore = useAuthStore();

        const response = await axios.put(`${API_URL}/user/profile`, userInfo, {
          headers: { Authorization: authStore.accessToken },
        });

        const validation = validateUserProfileResponse(response);

        if (!validation.success)
          return useNotificationStore().error(validation.error);

        await this.fetchUserProfile();
        useNotificationStore().success("Дані оновлені успішно");
      } catch (error) {
        const validation = validateUserProfileResponse(error as AxiosError);
        useNotificationStore().error(validation.error);
      }
    },

    async deleteUserProfile() {
      try {
        const authStore = useAuthStore();

        const response = await axios.delete(`${API_URL}/user/profile`, {
          headers: { Authorization: authStore.accessToken },
        });

        const validation = validateUserProfileResponse(response);

        if (!validation.success)
          return useNotificationStore().error(validation.error);

        useNotificationStore().success("Акаунт видалено успішно");
        useAuthStore().logout();
        this.logout();
      } catch (error) {
        const validation = validateUserProfileResponse(error as AxiosError);
        useNotificationStore().error(validation.error);
      }
    },
  },

  getters: {
    getUserProfile: (state) => {
      return state.userProfile;
    },

    isUserLogin: (state) => {
      return !!state.userProfile;
    },

    isUserAdmin: (state) => {
      return state.userProfile?.user_role === USER_ROLE_ADMIN;
    },
  },
});
