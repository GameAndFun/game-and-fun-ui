<script setup lang="ts">
import { useAuthStore } from "@/store/useAuthStore";
import { computed } from "vue";

const authStore = useAuthStore();

const userInfo = computed(() => authStore.getUserInfo);
</script>

<template>
  <main class="container">
    <h2>Welcome to Game & Fun {{ userInfo?.username }}</h2>
    <p class="p1">Start playing and having fun!</p>
  </main>
</template>

<style scoped>
main {
  padding: 2rem 0;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}
</style>
