<template>
  <div class="category-node">
    <div class="node-header">
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
      />
      <span v-else class="category-label">{{ category.name }}</span>

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
          :category="child"
          :all-categories="allCategories"
          @delete="removeChild"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type { PropType } from "vue";

interface Category {
  id: number;
  name: string;
  children: Category[];
  isBaseCategory?: boolean;
}

const props = defineProps<{
  category: Category;
  allCategories: Category[]; // потрібні всі категорії для дропдауна
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();

const isCollapsed = ref(false);
const isEditing = ref(false);
const editableName = ref(props.category.name);
const showLinkDropdown = ref(false);
const selectedLinkId = ref<number | "">("");

watch(
  () => props.category.name,
  (val) => (editableName.value = val)
);

const baseCategories = computed(() =>
  props.allCategories.filter(
    (cat) => cat.isBaseCategory && cat.id !== props.category.id
  )
);

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}

function startEdit() {
  isEditing.value = true;
  nextTick(() => {
    document.querySelector<HTMLInputElement>("input.category-input")?.focus();
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
    (c) => c.id !== childId
  );
}

function toggleLinkDropdown() {
  showLinkDropdown.value = !showLinkDropdown.value;
  selectedLinkId.value = "";
}

function linkToCategory() {
  const selected = props.allCategories.find(
    (cat) => cat.id === selectedLinkId.value
  );
  if (selected) {
    selected.children.push({
      ...props.category,
      children: [...props.category.children],
    });
    alert(
      `Категорію "${props.category.name}" прив’язано до "${selected.name}"`
    );
  }
  showLinkDropdown.value = false;
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
}

.toggle-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
}

.category-label {
  color: #f0f0f0;
  font-size: 14px;
  flex-grow: 1;
}

.category-input {
  background-color: transparent;
  color: #f0f0f0;
  border: none;
  outline: none;
  font-size: 14px;
  flex-grow: 1;
}

.btn-group {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.edit-btn,
.add-btn,
.delete-btn,
.link-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: 14px;
}

.edit-btn:hover,
.add-btn:hover,
.delete-btn:hover,
.link-btn:hover {
  color: #fff;
}

.link-dropdown {
  margin-top: 6px;
  margin-left: 22px;
  color: #ccc;
  font-size: 13px;
}

.link-dropdown select {
  background-color: #2a2a3e;
  color: #f0f0f0;
  border: 1px solid #555;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
