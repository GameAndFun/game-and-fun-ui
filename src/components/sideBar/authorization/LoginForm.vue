<template>
  <div class="action-form">
    <div class="inputs-wrapper">
      <AuthenticationInput
        placeholder="Логін*"
        :error="validationErrors.username"
        @input="enterLogin"
        @enter="handleLogin"
      >
        <template #icon><i class="icon-login" /></template>
      </AuthenticationInput>

      <div>
        <AuthenticationInput
          placeholder="Пароль*"
          type="password"
          :error="validationErrors.password"
          @input="enterPassword"
          @enter="handleLogin"
        >
          <template #icon><i class="icon-password" /></template>
        </AuthenticationInput>

        <div class="forgot-password-wrapper">
          <span class="auth-error">
            {{ validationErrors.auth }}
          </span>

          <p class="forgot-password" @click="emit('openRecoveryForm')">
            Відновити пароль
          </p>
        </div>
      </div>
    </div>

    <BaseButton class="login-button" @click="handleLogin">Увійти</BaseButton>

    <GoogleButton />

    <p class="text">
      Ще не маєш акаунту? Створи за хвилину та приєднуйся до нашої спільноти))
    </p>

    <BaseButton
      class="registration-button"
      @click="emit('openRegistrationForm')"
    >
      Зареєструватися
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth/useAuthStore";
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import GoogleButton from "@/components/ui/buttons/GoogleButton.vue";
import type { LoginValidationErrors } from "@/helpers/validators/auth/types";
import { validateLoginForm } from "@/helpers/validators/auth/validateLoginForm";
import AuthenticationInput from "@/components/ui/inputs/AuthenticationInput.vue";

const emit = defineEmits([
  "closeSideBar",
  "openRecoveryForm",
  "openRegistrationForm",
]);

const authStore = useAuthStore();

const credentials = ref({ username: "", password: "" });
const validationErrors = ref<LoginValidationErrors>({
  username: "",
  password: "",
});

const enterLogin = (username: string) => {
  credentials.value.username = username.trim();
};

const enterPassword = (password: string) => {
  credentials.value.password = password.trim();
};

const checkValidLoginData = () => {
  validationErrors.value = validateLoginForm({
    username: credentials.value.username,
    password: credentials.value.password,
  });

  const { username, password } = validationErrors.value;
  if (username || password) return false;
  return true;
};

const handleLogin = async () => {
  if (!checkValidLoginData()) return;

  const { success, error } = await authStore.login(credentials.value);

  if (success) emit("closeSideBar");

  if (error) validationErrors.value.auth = error;
};
</script>

<style lang="scss" scoped>
.action-form {
  height: 100%;
  padding: 40px 12px;
  border-radius: 16px;
  background: #0e0f14;
}

.inputs-wrapper {
  gap: 24px;
  display: flex;
  margin-bottom: 24px;
  flex-direction: column;
}

.forgot-password-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.auth-error {
  color: #ff6b6b;
  font-size: 14px;
}

.forgot-password {
  margin-top: 4px;
  font-size: 14px;
  text-align: right;
  font-size: 14px;
  text-decoration: underline;
  color: #1bf8bc;
  cursor: pointer;
}

.login-button {
  margin-bottom: 40px;
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
