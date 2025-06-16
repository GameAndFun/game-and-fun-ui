<script setup lang="ts">
import { computed } from "vue";
import UserPanel from "@/components/sideBar/user/UserPanel.vue";
import { useUserProfileStore } from "@/store/user/useUserProfileStore";
import AuthPanel from "@/components/sideBar/authorization/AuthPanel.vue";

const props = defineProps<{ isOpen: boolean }>();

const emit = defineEmits(["closeSideBar"]);

const userProfileStore = useUserProfileStore();

const isAuthPanelOpen = computed(() => {
  return props.isOpen && !userProfileStore.isUserLogin;
});

const isUserPanelOpen = computed(() => {
  return props.isOpen && userProfileStore.isUserLogin;
});
</script>

<template>
  <AuthPanel :isOpen="isAuthPanelOpen" @closeSideBar="emit('closeSideBar')" />

  <UserPanel
    :isOpen="isUserPanelOpen"
    :isAdmin="userProfileStore.isUserAdmin"
    @closeSideBar="emit('closeSideBar')"
  />
</template>

<style lang="scss" scoped></style>
