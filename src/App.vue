<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppHeader from "@/components/app/AppHeader.vue";
import AuthorizationPopup from "@/components/popups/AuthorizationPopup.vue";
import { useAuthStore } from "@/store/useAuthStore";

const isAuthorizationPopupOpen = ref(false);

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkUserLogin();
});
</script>

<template>
  <AppHeader @openAuthorizationPopup="isAuthorizationPopupOpen = true" />

  <router-view v-slot="{ Component, route }">
    <div :key="route.name">
      <component :is="Component" />
    </div>
  </router-view>

  <AuthorizationPopup
    :isOpen="isAuthorizationPopupOpen"
    @closePopup="isAuthorizationPopupOpen = false"
  />
</template>

<style src="@/assets/styles/main.scss"></style>
