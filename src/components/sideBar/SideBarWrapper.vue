<script setup lang="ts">
import { computed } from "vue";
import UserPanel from "@/components/sideBar/user/UserPanel.vue";
import { useUserProfileStore } from "@/store/user/useUserProfileStore";
import AuthPanel from "@/components/sideBar/authorization/AuthPanel.vue";

const props = defineProps<{ isOpen: boolean }>();

const emit = defineEmits(["closeSideBar"]);

const userProfileStore = useUserProfileStore();

const isAuthorizationPopupOpen = computed(() => {
  return props.isOpen && !userProfileStore.isUserLogin;
});

const isUserPopupOpen = computed(() => {
  return props.isOpen && userProfileStore.isUserLogin;
});
</script>

<template>
  <AuthPanel
    :isOpen="isAuthorizationPopupOpen"
    @closePopup="emit('closeSideBar')"
  />

  <UserPanel
    :isOpen="isUserPopupOpen"
    :isAdmin="userProfileStore.isUserAdmin"
    @closeSideBar="emit('closeSideBar')"
  />
</template>

<style lang="scss" scoped></style>
