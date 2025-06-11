<template>
  <div class="action-form">
    <h3 class="title">Загальна інформація</h3>

    <div class="inputs-wrapper">
      <AuthenticationInput placeholder="Ім'я*" @input="enterName" />

      <AuthenticationInput placeholder="Прізвище*" @input="enterSurname" />

      <AuthenticationInput placeholder="Телефон*" @input="enterPhone" />

      <AuthenticationInput placeholder="Email*" @input="enterEmail" />
    </div>

    <h3 class="title">Дані для входу</h3>

    <div class="inputs-wrapper">
      <AuthenticationInput placeholder="Логін*" @input="enterUsername" />

      <AuthenticationInput placeholder="Пароль*" @input="enterPassword" />
    </div>

    <div class="btns-wrap">
      <BaseButton @click="handleSignUp"> Зареєструватися </BaseButton>

      <p class="text">
        Вже маєш створений акаунту? Переходь до форми входу, GAF вже зачекався
        твого повернення
      </p>

      <BaseButton class="login-button"> Увійти </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSignUpStore } from "@/store/singUp/useSingUpStore";
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import AuthenticationInput from "@/components/ui/inputs/AuthenticationInput.vue";

const registrationData = ref({
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

const handleSignUp = () => {
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
