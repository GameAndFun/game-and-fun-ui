<script setup lang="ts">
import SerchInput from "@/components/ui/inputs/SerchInput.vue";
import BurgerButton from "@/components/ui/buttons/BurgerButton.vue";
</script>

<template>
  <header class="header">
    <nav class="container header-nav">
      <img class="logo" src="@/assets/images/app/logo.png" alt="" />

      <SerchInput />

      <BurgerButton @click="$emit('openAuthorizationPopup')" />
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
