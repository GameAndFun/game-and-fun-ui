import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

const apiUrl = "http://game-and-fun.com.ua/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "" as string,
    accessTokenExpiry: 0 as number, // timestamp
    refreshToken: "" as string,
    user: null as null | Record<string, any>,
  }),

  actions: {
    setSession(token: string, refreshToken: string, expiresIn: number) {
      this.accessToken = token;
      this.refreshToken = refreshToken;
      this.accessTokenExpiry = Date.now() + expiresIn * 1000;
      localStorage.setItem("accessToken", token);
      localStorage.setItem(
        "accessTokenExpiry",
        this.accessTokenExpiry.toString()
      );
    },

    async login(credentials: { username: string; password: string }) {
      const response = await axios.post(`${apiUrl}/auth/access-token`, {
        username: credentials.username,
        password: credentials.password,
      });

      const decodedToken = jwtDecode<JwtPayload>(response.data.access_token);
      const expiresIn = decodedToken.exp * 1000;

      this.setSession(
        response.data.access_token,
        response.data.refresh_token,
        expiresIn
      );

      await this.fetchCategories();

      await this.fetchProfile();
    },

    async fetchProfile() {
      console.log("fetchProfile", apiUrl);

      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: { Authorization: this.accessToken },
      });

      console.log("response", response);

      this.user = response.data;

      console.log("STATE", this.$state);
    },

    async fetchCategories() {
      const response = await axios.get(`${apiUrl}/admin/categories`, {
        headers: { Authorization: this.accessToken },
      });

      console.log("CATEGORIES", response);
    },

    logout() {
      this.accessToken = "";
      this.accessTokenExpiry = 0;
      this.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiry");
    },

    restoreSession() {
      const token = localStorage.getItem("accessToken");
      const expiry = Number(localStorage.getItem("accessTokenExpiry") || 0);
      if (token && expiry > Date.now()) {
        this.accessToken = token;
        this.accessTokenExpiry = expiry;
        this.fetchProfile();
      } else {
        this.logout();
      }
    },

    checkUserLogin() {
      const accessToken = localStorage.getItem("accessToken");
      const expiry = Number(localStorage.getItem("accessTokenExpiry") || 0);
      if (accessToken && expiry > Date.now()) {
        this.accessToken = accessToken;
        this.accessTokenExpiry = expiry;
        this.fetchProfile();
      }
    },
  },

  getters: {
    getUserInfo: (state) => {
      return state.user;
    },
  },
});
