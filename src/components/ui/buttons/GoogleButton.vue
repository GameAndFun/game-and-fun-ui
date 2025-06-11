<template>
  <BaseButton class="google-button">
    <div class="button-content">
      <img
        class="google-icon"
        src="@/assets/images/icons/google.png"
        alt="Google icon"
      />

      <span>Увійти з Google</span>
    </div>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
</script>

<style lang="scss" scoped>
.google-button {
  background: #fff;
  margin-bottom: 64px;
}

.button-content {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.google-icon {
  left: 0;
  width: 24px;
  height: 24px;
  position: absolute;
}
</style>
