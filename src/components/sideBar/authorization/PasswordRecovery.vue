<template>
  <div class="action-form">
    <button class="close-button" @click="emit('openLoginForm')">Назад</button>
    <h3 class="title">Забули пароль?</h3>
    <h4 class="subtitle">
      Введіть ваш email, щоб отримати код для відновлення пароля
    </h4>

    <div class="inputs-wrapper">
      <AuthenticationInput
        placeholder="Email*"
        @input="enterEmail"
        :error="validationErrors.email"
      >
      </AuthenticationInput>
    </div>

    <BaseButton class="recovery-button">Відновити пароль</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import type { RecoveryValidationErrors } from "@/helpers/validators/auth/types";
import AuthenticationInput from "@/components/ui/inputs/AuthenticationInput.vue";

const emit = defineEmits(["openLoginForm"]);

const recoveryData = ref({ email: "" });

const validationErrors = ref<RecoveryValidationErrors>({ email: "" });

const enterEmail = (username: string) => {
  recoveryData.value.email = username.trim();
};
</script>

<style lang="scss" scoped>
.action-form {
  height: 100%;
  padding: 40px 12px;
  border-radius: 16px;
  background: #0e0f14;
}

.title {
  font-size: 16px;
  font-weight: 400;
  color: #43f776;
  text-align: center;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #b2b2b2;
  text-align: center;
  margin-bottom: 12px;
}

.inputs-wrapper {
  gap: 24px;
  display: flex;
  margin-bottom: 24px;
  flex-direction: column;
}

.recovery-button {
  background: #1bf8bc;
}
</style>
