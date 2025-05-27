<template>
  <div class="category-view container">
    <div class="left-block">
      <button class="btn-add-category" @click="onAddCategory">
        Додати категорію
      </button>

      <div class="category-list">
        <div
          class="category-item"
          v-for="category in categories"
          :key="category.id"
          @click="onSelectCategory(category)"
        >
          <div class="category-item__name">{{ category.name }}</div>
        </div>
      </div>
    </div>

    <div class="right-block">
      <div class="right-block__header">
        <button @click="saveToLocalStorage">Save to Local Storage</button>
        <CategoryNode
          :category="selectedCategory"
          :all-categories="categories"
          v-if="selectedCategory"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Category } from "../../types/category";
import CategoryNode from "../../components/categorys/CategoryNode.vue";
const categories = ref<Category[]>([]);

const selectedCategory = ref<Category | null>(null);

function generateId(): string {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

const onSelectCategory = (category: Category) => {
  selectedCategory.value = category;
};

const onAddCategory = () => {
  console.log("categories.value", categories.value);

  categories.value?.push({
    id: generateId(),
    name: "Нова категорія",
    children: [],
    isBaseCategory: true,
  });
};

const saveToLocalStorage = () => {
  localStorage.setItem("categories", JSON.stringify(categories.value));
};

const loadFromLocalStorage = () => {
  const storedCategories = localStorage.getItem("categories");

  console.log("storedCategories", storedCategories);

  if (storedCategories) {
    categories.value = JSON.parse(storedCategories);
  }
};

onMounted(() => {
  loadFromLocalStorage();
});
</script>

<style lang="scss" scoped>
.category-view {
  padding-top: 24px;
  display: flex;
  gap: 24px;
}

.left-block {
  max-width: 400px;
  width: 100%;
  padding: 28px 16px;
  background: var(--unnamed-color-26303a) 0% 0% no-repeat padding-box;
  background: #26303a 0% 0% no-repeat padding-box;
  border-radius: 16px;
  gap: 24px;
  display: flex;
  flex-direction: column;
}

.btn-add-category {
  background: var(--unnamed-color-26303a) 0% 0% no-repeat padding-box;
  border: 1px solid var(--unnamed-color-1bf8bc);
  background: #26303a 0% 0% no-repeat padding-box;
  border: 1px solid #1bf8bc;
  border-radius: 8px;
  width: 100%;
  padding: 14px;
  color: #1bf8bc;
}

.category-item {
  padding: 14px 0;
  border-bottom: 1px solid #2f3c49;

  &:first-child {
    border-top: 1px solid #2f3c49;
  }
}

.right-block {
  width: 100%;
  padding: 28px 16px;
  background: #26303a 0% 0% no-repeat padding-box;
  border-radius: 16px;
  gap: 24px;
  display: flex;
  flex-direction: column;
}

.btn-edit-category {
  background: transparent;
  border: none;
  cursor: pointer;
}

.btn-add-subcategory {
  background: #0e0f14 0% 0% no-repeat padding-box;
  border: 1px solid #43f776;
  border-radius: 8px;
  color: #43f776;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
