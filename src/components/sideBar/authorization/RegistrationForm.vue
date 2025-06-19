<template>
  <div class="action-form">
    <h3 class="title">Загальна інформація</h3>
    <div class="inputs-wrapper">
      <AuthenticationInput
        placeholder="Ім'я*"
        :error="validationErrors.name"
        @input="enterName"
        @enter="handleSignUp"
      />

      <AuthenticationInput
        placeholder="Прізвище*"
        :error="validationErrors.surname"
        @input="enterSurname"
        @enter="handleSignUp"
      />

      <PhoneInput
        placeholder="Телефон*"
        :error="validationErrors.phone"
        @input="enterPhone"
        @enter="handleSignUp"
      />

      <AuthenticationInput
        placeholder="Email*"
        :error="validationErrors.email"
        @input="enterEmail"
        @enter="handleSignUp"
      />
    </div>

    <h3 class="title">Дані для входу</h3>

    <div class="inputs-wrapper">
      <AuthenticationInput
        placeholder="Логін*"
        :error="validationErrors.username"
        @input="enterUsername"
        @enter="handleSignUp"
      />

      <AuthenticationInput
        type="password"
        placeholder="Пароль*"
        :error="validationErrors.password"
        @input="enterPassword"
        @enter="handleSignUp"
      />
    </div>

    <div class="btns-wrap">
      <BaseButton @click="handleSignUp"> Зареєструватися </BaseButton>

      <p class="text">
        Вже маєш створений акаунту? Переходь до форми входу, GAF вже зачекався
        твого повернення
      </p>

      <BaseButton class="login-button" @click="emit('openLoginForm')">
        Увійти
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSignUpStore } from "@/store/singUp/useSingUpStore";
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import AuthenticationInput from "@/components/ui/inputs/AuthenticationInput.vue";
import type { RegistrationValidationErrors } from "@/helpers/validators/registration/types";
import { validateRegistrationForm } from "@/helpers/validators/registration/validateRegistrationForm";
import PhoneInput from "@/components/ui/inputs/PhoneInput.vue";

const emit = defineEmits(["openLoginForm"]);

const registrationData = ref({
  name: "",
  surname: "",
  phone: "",
  email: "",
  username: "",
  password: "",
});

const validationErrors = ref<RegistrationValidationErrors>({
  name: "",
  surname: "",
  phone: "",
  email: "",
  username: "",
  password: "",
});

const enterName = (value: string) => {
  registrationData.value.name = value;
};

const enterSurname = (value: string) => {
  registrationData.value.surname = value;
};

const enterPhone = (value: string) => {
  registrationData.value.phone = value;
};

const enterEmail = (value: string) => {
  registrationData.value.email = value;
};

const enterUsername = (value: string) => {
  registrationData.value.username = value;
};

const enterPassword = (value: string) => {
  registrationData.value.password = value;
};

const checkValidRegistrationData = () => {
  validationErrors.value = validateRegistrationForm(registrationData.value);
  return Object.values(validationErrors.value).every((error) => !error);
};

const handleSignUp = () => {
  if (!checkValidRegistrationData()) return;

  const signUpStore = useSignUpStore();
  signUpStore.signUp(registrationData.value);
};
</script>

<style scoped>
.action-form {
  height: 100%;
  padding: 40px 12px 100px 12px;
  border-radius: 16px;
  background: #0e0f14;
  overflow-y: auto;
}

.title {
  font-size: 16px;
  font-weight: 400;
  color: #43f776;
  text-align: center;
  margin-bottom: 24px;
}

.inputs-wrapper {
  gap: 24px;
  display: flex;
  margin-bottom: 24px;
  flex-direction: column;
}

.btns-wrap {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.text {
  color: #b2b2b2;
  text-align: center;
}

.login-button {
  background: #1bf8bc;
}
</style>
