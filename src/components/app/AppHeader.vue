<script setup lang="ts">
import SerchInput from "@/components/ui/inputs/SerchInput.vue";
import BurgerButton from "@/components/ui/buttons/BurgerButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <header class="header">
    <nav class="container header-nav">
      <img
        class="logo"
        src="@/assets/images/app/logo.png"
        alt=""
        @click="router.push('/')"
      />

      <SerchInput />

      <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
        <div @click="router.push('/user-profile')">User</div>
        <div @click="router.push('/categories-admin')">Categories</div>
        <BurgerButton @click="$emit('openAuthorizationPopup')" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 10px 0;
  position: relative;
  background: #26303a;
}

.header-nav {
  gap: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
}

.logo {
  height: 36px;
  width: 36px;
}
</style>
