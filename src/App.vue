<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppHeader from "@/components/app/AppHeader.vue";
import { useAuthStore } from "@/store/auth/useAuthStore";
import SideBarWrapper from "@/components/sideBar/SideBarWrapper.vue";
import Notification from "@/components/ui/notification/Notification.vue";

const authStore = useAuthStore();

const isSideBarOpen = ref(false);

onMounted(async () => {
  authStore.restoreSession();
  authStore.updateAccessToken(authStore.updateSession);
});
</script>

<template>
  <AppHeader @openSideBar="isSideBarOpen = true" />

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
