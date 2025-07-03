<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppHeader from "@/components/app/AppHeader.vue";
import { useAuthStore } from "@/store/auth/useAuthStore";
import SideBarWrapper from "@/components/sideBar/SideBarWrapper.vue";
import Notification from "@/components/ui/notification/Notification.vue";

import { useNotificationStore } from "@/store/notification/useNotification";

const handleClick = () => {
  const notificationStore = useNotificationStore();
  notificationStore.success("Operation successful!");
};

const handleClickError = () => {
  const notificationStore = useNotificationStore();
  notificationStore.error("Operation failed!");
};

const handleClickWarning = () => {
  const notificationStore = useNotificationStore();
  notificationStore.warning("Operation warning!");
};

const handleClickInfo = () => {
  const notificationStore = useNotificationStore();
  notificationStore.info("Operation info!");
};

const authStore = useAuthStore();

const isSideBarOpen = ref(false);

onMounted(async () => {
  authStore.restoreSession();
  authStore.updateAccessToken(authStore.updateSession);
});
</script>

<template>
  <AppHeader @openSideBar="isSideBarOpen = true" />

  <div class="notification-buttons">
    <button @click="handleClick">Click me success</button>
    <button @click="handleClickError">Click me error</button>
    <button @click="handleClickWarning">Click me warning</button>
    <button @click="handleClickInfo">Click me info</button>
  </div>

  <SideBarWrapper
    :isOpen="isSideBarOpen"
    @closeSideBar="isSideBarOpen = false"
  />

  <router-view v-slot="{ Component, route }">
    <div :key="route.name">
      <component :is="Component" />
    </div>
  </router-view>

  <Notification message="Operation successful!" type="success" />
</template>

<style src="@/assets/styles/main.scss"></style>

<style scoped>
.notification-buttons {
  display: flex;
  gap: 10px;
}
</style>
