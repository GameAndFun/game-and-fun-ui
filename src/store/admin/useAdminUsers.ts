import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useAdminUsers = defineStore("adminUsers", {
  state: () => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      const authStore = useAuthStore();
      const response = await axios.get(
        "http://game-and-fun.com.ua/api/admin/users",
        {
          headers: { Authorization: authStore.accessToken },
        }
      );

      this.users = response.data;

      console.log("response.data", response.data);

      return response.data;
    },

    // fetch user by id
    // update user by id
    // delete user by id
    // GET/catalog/categorieslist
  },
});
