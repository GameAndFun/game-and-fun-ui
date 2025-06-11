import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import axios, { type AxiosError } from "axios";
import { useUserProfileStore } from "@/store/user/useUserProfileStore";
import type { AuthSuccessData, AuthState } from "@/store/auth/types";
import { API_URL, ONE_MINUTE, TOKEN_EXPIRY_TIME } from "@/store/constants";
import type { AuthResult, JwtPayload, LoginData } from "@/store/auth/types";
import { validateAuthResponse } from "@/helpers/validators/auth/validateAuthResponse";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: "",
    refreshToken: "",
    accessTokenExpiry: 0,
  }),

  actions: {
    async login(credentials: LoginData): Promise<AuthResult> {
      try {
        const response = await axios.post(`${API_URL}/auth/access-token`, {
          username: credentials.username,
          password: credentials.password,
        });

        const validation = validateAuthResponse(response);
        if (!validation.success) return validation;

        this.setSession(response.data);

        await useUserProfileStore().fetchUserProfile();

        return { success: true, error: null };
      } catch (error) {
        const validation = validateAuthResponse(error as AxiosError);
        return validation;
      }
    },

    async logout() {
      const userProfileStore = useUserProfileStore();

      this.accessToken = "";
      this.accessTokenExpiry = 0;
      this.refreshToken = "";
      await userProfileStore.logout();
      localStorage.removeItem("GAF_AUTH_DATA");
    },

    setSession(response: AuthSuccessData) {
      const { access_token, refresh_token } = response;

      const decodedToken = jwtDecode<JwtPayload>(access_token);
      const expiresIn = decodedToken.exp * 1000;

      this.accessToken = access_token;
      this.refreshToken = refresh_token;
      this.accessTokenExpiry = expiresIn;

      this.setDataToLocalStorage();
    },

    async restoreSession() {
      const authData = localStorage.getItem("GAF_AUTH_DATA");
      const authDataObj = JSON.parse(authData || "{}");
      const expiry = authDataObj?.expiresIn;

      if (authDataObj && expiry > Date.now()) {
        this.accessToken = authDataObj.accessToken;
        this.accessTokenExpiry = expiry;
        await useUserProfileStore().fetchUserProfile();
      } else if (authDataObj && expiry < Date.now()) {
        this.updateSession();
      } else {
        this.logout();
      }
    },

    setDataToLocalStorage() {
      localStorage.setItem(
        "GAF_AUTH_DATA",
        JSON.stringify({
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
          expiresIn: this.accessTokenExpiry,
        })
      );
    },

    async updateSession() {
      const authData = localStorage.getItem("GAF_AUTH_DATA");
      const authDataObj = JSON.parse(authData || "{}");

      if (authDataObj) {
        const refreshToken = authDataObj.refreshToken;

        const response = await axios.get(`${API_URL}/auth/refresh-token`, {
          params: { token: refreshToken },
          headers: { Authorization: authDataObj.accessToken },
        });

        this.accessToken = response.data.access_token;
        this.accessTokenExpiry = Date.now() + TOKEN_EXPIRY_TIME;
        this.refreshToken = response.data.refresh_token;

        this.setDataToLocalStorage();
      }
      return { newExpiry: this.accessTokenExpiry };
    },

    updateAccessToken(
      refreshTokenFn: () => Promise<{ newExpiry: number }>,
      newExpiry = undefined as number | undefined
    ) {
      let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
      const now = Date.now();

      const authData = localStorage.getItem("GAF_AUTH_DATA");
      const authDataObj = JSON.parse(authData || "{}");

      const expiry = newExpiry ? newExpiry : Number(authDataObj.expiresIn || 0);

      const timeUntilRefresh = expiry - now - ONE_MINUTE;

      if (refreshTimeout) clearTimeout(refreshTimeout);

      if (timeUntilRefresh > 0) {
        refreshTimeout = setTimeout(async () => {
          try {
            const { newExpiry } = await refreshTokenFn();
            this.updateAccessToken(refreshTokenFn, newExpiry);
          } catch (err) {
            console.error("Помилка оновлення токена:", err);
            this.logout();
          }
        }, timeUntilRefresh);
      } else {
        this.logout();
      }
    },
  },
});
