<template>
  <div
    ref="wrapperRef"
    :class="['search-input-wrapper', { expanded: isFocusedInput }]"
    @click="handleFocus"
  >
    <input
      class="search-input"
      v-model="searchQuery"
      type="text"
      placeholder="Я шукаю..."
      @input="handleSearch"
    />

    <i class="icon-cross" v-if="searchQuery" @click="clearSearch($event)" />
    <i class="icon-search" v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const searchQuery = ref("");
const isFocusedInput = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

const emit = defineEmits(["update:search"]);

const handleSearch = () => {
  emit("update:search", searchQuery.value);
};

const clearSearch = (event: MouseEvent) => {
  event.stopPropagation();
  searchQuery.value = "";
  emit("update:search", searchQuery.value);
};

const handleFocus = () => {
  isFocusedInput.value = true;
};

const handleClickOutside = (event: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    isFocusedInput.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.search-input-wrapper {
  left: 50%;
  z-index: 1;
  position: absolute;
  transform: translateX(-50%);
  width: 100%;
  max-width: 220px;
  transition: max-width 0.3s ease;
}

.search-input-wrapper.expanded {
  max-width: calc(100vw - 24px);
}

.search-input {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  padding: 0 40px 0 16px;
  border: transparent;
  outline: transparent;
  font-size: 16px;
  background-color: #e0f0ff;
  transition: all 0.3s ease;
}

.icon-cross {
  top: 50%;
  right: 16px;
  width: 16px;
  height: 16px;
  color: #000;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
}

.icon-search {
  top: 50%;
  right: 16px;
  width: 16px;
  height: 16px;
  color: #000;
  position: absolute;
  transform: translateY(-50%) rotate(270deg);
}
</style>
