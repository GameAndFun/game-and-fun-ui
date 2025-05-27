<template>
  <div class="user-profile" v-if="user">
    <h2 class="title">Профіль користувача</h2>
    <div class="info">
      <p><strong>ID:</strong> {{ user.user_id }}</p>
      <p><strong>Ім'я:</strong> {{ user.name }}</p>
      <p><strong>Прізвище:</strong> {{ user.surname }}</p>
      <p><strong>Нікнейм:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Телефон:</strong> {{ user.phone }}</p>
      <p><strong>Роль:</strong> {{ user.user_role }}</p>
      <p><strong>Створено:</strong> {{ formatDate(user.created_at) }}</p>
      <p><strong>Оновлено:</strong> {{ formatDate(user.updated_at) }}</p>
      <p><strong>Видалено:</strong> {{ user.is_deleted ? "Так" : "Ні" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/useAuthStore";
import { computed } from "vue";

const authStore = useAuthStore();

const user = computed(() => authStore.getUserInfo);

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<style scoped>
.user-profile {
  padding: 24px;
  border-radius: 12px;
  background: #1e1e1e;
  color: #fff;
  max-width: 500px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 20px;
  margin-bottom: 16px;
  text-align: center;
}

.info p {
  margin: 6px 0;
  font-size: 14px;
}

.info strong {
  display: inline-block;
  width: 100px;
}
</style>
