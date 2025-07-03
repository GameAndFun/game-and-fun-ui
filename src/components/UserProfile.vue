<template>
  <div class="user-profile">
    <div class="profile-header">
      <div class="profile-avatar">
        <img :src="user.avatar || defaultAvatar" :alt="user.name" />
      </div>
      <div class="profile-info">
        <h2 class="profile-name">{{ user.name }} {{ user.surname }}</h2>
        <p class="profile-email">{{ user.email }}</p>
        <p class="profile-phone">{{ user.phone }}</p>
        <button class="edit-button" @click="openEditForm">
          <i class="fas fa-edit"></i> Редагувати
        </button>
      </div>
    </div>

    <!-- Edit Form Modal -->
    <div v-if="isEditFormOpen" class="modal-overlay" @click="closeEditForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Редагувати профіль</h3>
          <button class="close-button" @click="closeEditForm">&times;</button>
        </div>
        <form @submit.prevent="handleSubmit" class="edit-form">
          <div class="form-group">
            <label for="name">Ім'я</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>
          <div class="form-group">
            <label for="surname">Прізвище</label>
            <input
              type="text"
              id="surname"
              v-model="formData.surname"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email" required />
          </div>
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input type="tel" id="phone" v-model="formData.phone" required />
          </div>
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="closeEditForm">
              Скасувати
            </button>
            <button type="submit" class="save-button">Зберегти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const defaultAvatar = "https://via.placeholder.com/150";

interface User {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar?: string;
}

const props = defineProps<{
  user: User;
}>();

const emit = defineEmits<{
  (e: "update", data: User): void;
}>();

const isEditFormOpen = ref(false);
const formData = reactive<User>({
  name: "",
  surname: "",
  email: "",
  phone: "",
});

const openEditForm = () => {
  formData.name = props.user.name;
  formData.surname = props.user.surname;
  formData.email = props.user.email;
  formData.phone = props.user.phone;
  isEditFormOpen.value = true;
};

const closeEditForm = () => {
  isEditFormOpen.value = false;
};

const handleSubmit = () => {
  emit("update", { ...formData });
  closeEditForm();
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.profile-avatar {
  flex-shrink: 0;
}

.profile-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f3f4f6;
}

.profile-info {
  flex-grow: 1;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.profile-email,
.profile-phone {
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.edit-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.edit-button:hover {
  background-color: #2563eb;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-button,
.save-button {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
}

.cancel-button {
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.save-button {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.cancel-button:hover {
  background-color: #e5e7eb;
}

.save-button:hover {
  background-color: #2563eb;
}

@media (max-width: 640px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-avatar img {
    width: 120px;
    height: 120px;
  }

  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
