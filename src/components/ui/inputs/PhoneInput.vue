<template>
  <div class="phone-input">
    <div class="input-wrapper">
      <slot name="icon" />

      <div class="input-container">
        <label :class="['label', { 'label-active': isActive }]">{{
          placeholder
        }}</label>
        <IMaskComponent
          v-model="phone"
          :mask="mask"
          unmask="typed"
          class="input"
          :placeholder="inputPlaceholder"
          @blur="handleBlur"
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
import { IMaskComponent } from "vue-imask";
import { ref, defineProps, computed, defineEmits, watch } from "vue";

const emit = defineEmits(["input", "blur", "focus", "enter"]);

defineProps<{ placeholder: string; error?: string }>();

const isFocused = ref(false);
const phone = ref<string>("");
const inputPlaceholder = ref<string>("");

const mask = "+{38} (000) 000-00-00";

const isActive = computed(() => isFocused.value || phone.value !== "");

watch(phone, (newVal) => {
  emit("input", newVal);
});

const handleBlur = () => {
  emit("blur");
  isFocused.value = false;
  inputPlaceholder.value = "";
};

const handleFocus = () => {
  emit("focus");
  isFocused.value = true;
  inputPlaceholder.value = "+38 (___) ___-__-__";
};
</script>

<style scoped>
.phone-input {
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

.icon {
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
