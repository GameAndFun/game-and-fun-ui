<template>
  <div class="authentication-input">
    <div class="input-wrapper">
      <slot name="icon" />

      <div class="input-container">
        <label :class="['label', { 'label-active': isActive }]">{{
          placeholder
        }}</label>
        <input
          class="input"
          v-model="value"
          :type="type ? type : 'text'"
          @blur="handleBlur"
          @input="handleInput"
          @focus="handleFocus"
          @keydown.enter="emit('enter')"
        />
      </div>
    </div>

    <p :class="['input-text', { 'error-text': error }]">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from "vue";

defineProps<{
  placeholder: string;
  error?: string;
  type?: string;
}>();

const emit = defineEmits(["input", "blur", "focus", "enter"]);

const value = ref("");
const isFocused = ref(false);

const isActive = computed(() => isFocused.value || value.value !== "");

const handleBlur = () => {
  emit("blur");
  isFocused.value = false;
};

const handleFocus = () => {
  emit("focus");
  isFocused.value = true;
};

const handleInput = () => {
  emit("input", value.value);
};
</script>

<style scoped>
.authentication-input {
  position: relative;
}

.input-wrapper {
  height: 48px;
  border-radius: 8px;
  padding: 14px 18px;
  border: 1px solid #4c4c4c;
  gap: 10px;
  display: flex;
  align-items: center;
  background-color: #0e0f14;

  &:focus-within {
    border-color: #b2b2b2;
  }
}

.input-wrapper .icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: #ccc;
}

.input-container {
  position: relative;
  width: 100%;
}

.label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #e1e1e1;
  font-size: 16px;
  pointer-events: none;
  transition: 0.2s ease;
  background-color: #0e0f14;
  padding: 0 4px;
}

.label-active {
  top: -10px;
  font-size: 12px;
  color: #b2b2b2;
}

.input {
  width: 100%;
  font-size: 16px;
  background-color: #0e0f14;
  outline: transparent;
  border: transparent;
  color: #fff;
  border-radius: 8px;
}

.input-text {
  font-size: 12px;
  color: #fff;
  margin-top: 4px;
  height: 14px;
}

.error-text {
  color: #db5a62;
}
</style>
