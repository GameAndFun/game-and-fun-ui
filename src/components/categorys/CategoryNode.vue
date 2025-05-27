<template>
  <div class="category-node">
    <div
      class="node-header"
      :class="{
        'disabled-input': category.disabled,
      }"
    >
      <button
        v-if="category.children.length"
        class="toggle-btn"
        @click="toggleCollapse"
        :title="isCollapsed ? 'Розгорнути' : 'Згорнути'"
      >
        {{ isCollapsed ? "▶" : "▼" }}
      </button>

      <input
        v-if="isEditing"
        class="category-input"
        v-model="editableName"
        @blur="saveEdit"
        @keydown.enter="saveEdit"
        autofocus
        :disabled="category.isLinked"
      />
      <span v-else class="category-label" @dblclick="startEdit">
        {{ category.name }}
      </span>

      <div class="btn-group">
        <button class="edit-btn" @click="startEdit" title="Редагувати">
          ✏️
        </button>
        <button
          class="add-btn"
          @click="addSubcategory"
          title="Додати підкатегорію"
        >
          ➕
        </button>
        <button class="delete-btn" @click="confirmDelete" title="Видалити">
          🗑
        </button>
        <button
          class="link-btn"
          @click="toggleLinkDropdown"
          title="Прив’язати категорію"
        >
          🔗
        </button>
      </div>
    </div>

    <div v-if="showLinkDropdown" class="link-dropdown">
      <label>
        Прив’язати до:
        <select v-model="selectedLinkId" @change="linkToCategory">
          <option disabled value="">Оберіть категорію</option>
          <option
            v-for="base in baseCategories"
            :key="base.id"
            :value="base.id"
          >
            {{ base.name }}
          </option>
        </select>
      </label>
    </div>

    <transition name="fade">
      <div class="node-children" v-show="!isCollapsed">
        <CategoryNode
          v-for="child in category.children"
          :key="child.id"
          :category="checkChildren(child)"
          @delete="removeChild"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from "vue";

const checkChildren = (category: Category) => {
  if (category.isLinked) {
    const categoryBase = props.allCategories.find(
      (cat) => cat.id === category.id
    );

    if (categoryBase) {
      const children = [...categoryBase.children].map((child) => ({
        ...child,
        disabled: true,
      }));

      return {
        ...categoryBase,
        disabled: true,
        children: [...children],
        isLinked: true,
        isBaseCategory: false,
      };
    }
  }

  return category;
};

interface Category {
  id: number;
  name: string;
  children: Category[];
  isBaseCategory?: boolean;
  isLinked?: boolean;
  disabled?: boolean;
}

const props = defineProps<{
  category: Category;
  allCategories: Category[];
}>();

const baseCategories = computed(() =>
  props.allCategories.filter(
    (cat) => cat.isBaseCategory && cat.id !== props.category.id
  )
);

function linkToCategory() {
  const selected = props.allCategories.find(
    (cat) => cat.id === selectedLinkId.value
  );

  if (selected) {
    props.category.children.push({
      ...selected,
      isBaseCategory: false,
      isLinked: true,
      disabled: true,
      children: [...selected.children],
    });
    alert(`Категорію "${selected.name}" прив’язано до "${selected.name}"`);
  }
  showLinkDropdown.value = false;
}

const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();

const isCollapsed = ref(false);
const isEditing = ref(false);
const editableName = ref(props.category.name);

watch(
  () => props.category.name,
  (newVal) => {
    editableName.value = newVal;
  }
);

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}

function startEdit() {
  isEditing.value = true;
  nextTick(() => {
    const input = document.querySelector<HTMLInputElement>(
      "input.category-input"
    );
    input?.focus();
  });
}

function saveEdit() {
  if (editableName.value.trim()) {
    props.category.name = editableName.value.trim();
  } else {
    editableName.value = props.category.name;
  }
  isEditing.value = false;
}

function addSubcategory() {
  const newId = Date.now();
  props.category.children.push({
    id: newId,
    name: "Нова підкатегорія",
    children: [],
  });
  isCollapsed.value = false;
}

function confirmDelete() {
  if (confirm(`Ви дійсно хочете видалити "${props.category.name}"?`)) {
    emit("delete", props.category.id);
  }
}

function removeChild(childId: number) {
  props.category.children = props.category.children.filter(
    (child) => child.id !== childId
  );
}
const showLinkDropdown = ref(false);
const selectedLinkId = ref<number | "">("");

function toggleLinkDropdown() {
  showLinkDropdown.value = !showLinkDropdown.value;
  selectedLinkId.value = "";
}
</script>

<style scoped>
.category-node {
  margin-left: 16px;
  margin-bottom: 8px;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background-color: #1e1e2f;
  border: 1px solid #333;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.node-header:hover {
  background-color: #2a2a3e;
}

.toggle-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.toggle-btn:hover {
  color: #fff;
  transform: scale(1.1);
}

.category-label {
  color: #f0f0f0;
  font-size: 14px;
  cursor: default;
  user-select: none;
  flex-grow: 1;
}

.category-input {
  background-color: transparent;
  color: #f0f0f0;
  border: none;
  outline: none;
  font-size: 14px;
  flex-grow: 1;
  padding: 2px 4px;
  width: 100%;
}

.category-input::placeholder {
  color: #666;
}

.btn-group {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.edit-btn,
.add-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: 14px;
  transition: color 0.2s ease;
}

.edit-btn:hover,
.add-btn:hover,
.delete-btn:hover {
  color: #fff;
}

.node-children {
  margin-left: 14px;
  margin-top: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.disabled-input {
  pointer-events: none;
  opacity: 0.5;
}
</style>
