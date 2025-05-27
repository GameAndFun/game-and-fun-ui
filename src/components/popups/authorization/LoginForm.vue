<template>
  <div class="action-form">
    <div class="inputs-wrapper">
      <AuthenticationInput placeholder="Логін" @input="handleLogin">
        <template #icon><i class="icon-login" /> </template>
      </AuthenticationInput>

      <div>
        <AuthenticationInput placeholder="Пароль" @input="handlePassword">
          <template #icon><i class="icon-password" /> </template>
        </AuthenticationInput>
        <p class="forgot-password">Відновити пароль</p>
      </div>
    </div>

    <BaseButton class="login-button" @click="login">Увійти</BaseButton>

    <BaseButton class="google-button" @click="getUserProfile">
      <div class="google-button-content">
        <img
          class="google-icon"
          src="@/assets/images/icons/google.png"
          alt="Google icon"
        />

        <span>Увійти з Google</span>
      </div>
    </BaseButton>

    <BaseButton @click="getUsers">Users</BaseButton>

    <p class="text">
      Ще не маєш акаунту? Створи за хвилину та приєднуйся до нашої спільноти))
    </p>

    <BaseButton class="registration-button"> Зареєструватися </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import AuthenticationInput from "@/components/ui/inputs/AuthenticationInput.vue";
import { ref } from "vue";
import axios from "axios";
const authData = ref({
  username: "",
  password: "",
});

import { useAuthStore } from "@/store/useAuthStore";

const accessToken = ref("");
const refreshToken = ref("");

const login = async () => {
  const authStore = useAuthStore();

  await authStore.login(authData.value);

  // const loginUrl = "http://game-and-fun.com.ua/api/auth/access-token";
  // const response = await axios.post(loginUrl, {
  //   password: authData.value.password,
  //   username: authData.value.username,
  // });

  // accessToken.value = response.data.access_token;
  // refreshToken.value = response.data.refresh_token;

  // console.log("response", response);
};

const handlePassword = (value: string) => {
  authData.value.password = value;
};

const handleLogin = (value: string) => {
  authData.value.username = value;
};

const getUserProfile = async () => {
  console.log("getUserProfile", accessToken.value);

  const userProfileUrl = "http://game-and-fun.com.ua/api/user/profile";
  const response = await axios.get(userProfileUrl, {
    headers: { Authorization: accessToken.value },
  });

  console.log("response", response);
};

const getUsers = async () => {
  const usersUrl = "http://game-and-fun.com.ua/api/admin/users";
  const response = await axios.get(usersUrl, {
    headers: { Authorization: accessToken.value },
  });

  console.log("response", response);
};
</script>

<style scoped>
.action-form {
  padding: 40px 12px;
  border-radius: 16px;
  background: #0e0f14;
  height: 100%;
}

.inputs-wrapper {
  gap: 24px;
  display: flex;
  margin-bottom: 24px;
  flex-direction: column;
}

.forgot-password {
  margin-top: 4px;
  font-size: 14px;
  text-align: right;
  font-size: 14px;
  text-decoration: underline;
  color: #1bf8bc;
}

.login-button {
  margin-bottom: 40px;
}

.google-button {
  background: #fff;
  margin-bottom: 64px;
}

.google-button-content {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.google-icon {
  left: 0;
  width: 24px;
  height: 24px;
  position: absolute;
}

.text {
  color: #b2b2b2;
  text-align: center;
  margin-bottom: 24px;
}

.registration-button {
  background: #1bf8bc;
}
</style>
