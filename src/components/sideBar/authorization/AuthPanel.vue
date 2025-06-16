<template>
  <div :class="['auth-panel', { active: isOpen }]">
    <div class="panel-header">
      <button
        :class="['nav-button', { 'nav-active': isLoginTab }]"
        @click="changeTab('login')"
      >
        <i :class="['icon-login', { 'icon-active': isLoginTab }]"></i>

        <span class="button-text" v-show="isLoginTab">Вхід</span>
      </button>

      <button
        :class="['nav-button', { 'nav-active': !isLoginTab }]"
        @click="changeTab('registration')"
      >
        <i :class="['icon-registration', { 'icon-active': !isLoginTab }]"></i>
        <span class="button-text" v-show="!isLoginTab">Реїстрація</span>
      </button>

      <button class="close-button" @click="closeSideBar">
        <i class="icon-cross"></i>
      </button>
    </div>

    <div class="panel-content">
      <transition name="form-fade" mode="out-in">
        <LoginForm
          v-if="activeTab === 'login'"
          key="login"
          @closeSideBar="closeSideBar"
          @openRecoveryForm="changeTab('recovery')"
          @openRegistrationForm="changeTab('registration')"
        />

        <PasswordRecovery
          v-else-if="activeTab === 'recovery'"
          key="recovery"
          @openLoginForm="changeTab('login')"
        />

        <RegistrationForm
          v-else-if="activeTab === 'registration'"
          key="registration"
          @closeSideBar="closeSideBar"
          @openLoginForm="changeTab('login')"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LoginForm from "@/components/sideBar/authorization/LoginForm.vue";
import RegistrationForm from "@/components/sideBar/authorization/RegistrationForm.vue";
import PasswordRecovery from "@/components/sideBar/authorization/PasswordRecovery.vue";

const emit = defineEmits(["closeSideBar"]);

defineProps<{ isOpen: boolean }>();

const activeTab = ref("login");

const isLoginTab = computed(
  () => activeTab.value === "login" || activeTab.value === "recovery"
);

const changeTab = (action: string) => {
  activeTab.value = action;
};

const closeSideBar = () => {
  emit("closeSideBar");
};
</script>

<style scoped>
.auth-panel {
  position: fixed;
  top: 0;
  right: 0;
  max-width: 500px;
  width: 100%;
  height: 100vh;
  z-index: 10;
  transform: translateX(100%);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
  background: #1b222a;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.auth-panel.active {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
  display: block;
}

.panel-header {
  gap: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #1e262f;
}

.nav-button {
  background: #2f3c49;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  height: 48px;
  max-width: 48px;
  width: 100%;
  transition: all 0.3s ease;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-active {
  max-width: 100%;
}

.icon-login {
  font-size: 18px;
}

.icon-registration {
  font-size: 18px;
}

.icon-active {
  color: #43f776;
}

.button-text {
  font-size: 14px;
  color: #43f776;
}

.close-button {
  border-radius: 8px;
  color: #fff;
  background: transparent;
  max-width: 48px;
  width: 100%;
  height: 48px;
  border: 1px solid #2f3c49;
  cursor: pointer;
}

.icon-cross {
  font-size: 20px;
  color: #b2b2b2;
}

.panel-content {
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.form-fade-enter-from,
.form-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.form-fade-enter-to,
.form-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
