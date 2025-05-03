<template>
  <div class="action-form">
    <h3 class="title">Загальна інформація</h3>

    <div class="inputs-wrapper">
      <AuthenticationInput placeholder="Ім'я*" />

      <AuthenticationInput placeholder="Прізвище*" />

      <AuthenticationInput placeholder="Телефон*" />

      <AuthenticationInput placeholder="Email" />
    </div>

    <h3 class="title">Дані для входу</h3>

    <div class="inputs-wrapper">
      <AuthenticationInput placeholder="Логін*" />

      <AuthenticationInput placeholder="Пароль*" />
    </div>

    <div class="btns-wrap">
      <BaseButton> Зареєструватися </BaseButton>

      <p class="text">
        Вже маєш створений акаунту? Переходь до форми входу, GAF вже зачекався
        твого повернення))
      </p>

      <BaseButton class="login-button"> Увійти </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import AuthenticationInput from "@/components/ui/inputs/AuthenticationInput.vue";
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
