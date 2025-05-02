<template>
  <button :class="['base-button', className]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>();
defineEmits<{ (event: "click"): void }>();
</script>

<style scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 100%;
  color: #0e0f14;
  border-radius: 8px;
  background: #43f776;
  transition: all 0.3s ease;
}

:deep(.base-button) {
  all: unset;
}

.base-button:hover {
  opacity: 0.8;
}

.base-button:active {
  opacity: 0.6;
}
</style>
