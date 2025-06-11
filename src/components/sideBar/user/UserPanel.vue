<template>
  <div :class="['user-panel', { active: isOpen }]">
    <div class="panel-header">
      <button class="logout-button" @click="logout">Log out</button>
      <button class="close-button" @click="closeSideBar">
        <i class="icon-cross"></i>
      </button>
    </div>

    <div class="navigation-wrapper">
      <div class="user-links">
        <router-link
          class="navigation-link"
          :to="{ name: 'user-profile' }"
          @click="closeSideBar"
        >
          Профайл
        </router-link>
      </div>

      <div class="admin-links" v-if="isAdmin">
        <router-link
          :to="{ name: 'admin-users' }"
          class="navigation-link"
          @click="closeSideBar"
        >
          Користувачі
        </router-link>
        <router-link
          :to="{ name: 'admin-moderation' }"
          class="navigation-link"
          @click="closeSideBar"
        >
          Модерація
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth/useAuthStore";

const authStore = useAuthStore();

const emit = defineEmits(["closeSideBar"]);
defineProps<{ isOpen: boolean; isAdmin: boolean }>();

const closeSideBar = () => {
  emit("closeSideBar");
};

const logout = () => {
  authStore.logout();
  closeSideBar();
};
</script>

<style scoped>
.user-panel {
  position: fixed;
  top: 0;
  right: 0;
  max-width: 320px;
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

.user-panel.active {
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

.logout-button {
  background: #2f3c49;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  height: 48px;
  max-width: 80px;
  width: 100%;
  transition: all 0.3s ease;
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

.navigation-wrapper {
  padding: 24px 12px;
  gap: 4px;
  display: flex;
  flex-direction: column;
}

.user-links,
.admin-links {
  gap: 4px;
  display: flex;
  flex-direction: column;
}

.navigation-link {
  color: #fff;
}
</style>
