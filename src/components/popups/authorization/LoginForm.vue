<template>
  <div class="action-form">
    <div class="inputs-wrapper">
      <AuthenticationInput placeholder="Логін">
        <template #icon><i class="icon-login" /> </template>
      </AuthenticationInput>

      <div>
        <AuthenticationInput placeholder="Пароль">
          <template #icon><i class="icon-password" /> </template>
        </AuthenticationInput>
        <p class="forgot-password">Відновити пароль</p>
      </div>
    </div>

    <BaseButton class="login-button">Увійти</BaseButton>

    <BaseButton class="google-button">
      <div class="google-button-content">
        <img
          class="google-icon"
          src="@/assets/images/icons/google.png"
          alt="Google icon"
        />

        <span>Увійти з Google</span>
      </div>
    </BaseButton>

    <p class="text">
      Ще не маєш акаунту? Створи за хвилину та приєднуйся до нашої спільноти))
    </p>

    <BaseButton class="registration-button"> Зареєструватися </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import AuthenticationInput from "@/components/ui/inputs/AuthenticationInput.vue";
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
