<template>
  <div class="notifications-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        role="alert"
      >
        <div
          :class="[
            'notification__content',
            `notification--${notification.type}`,
          ]"
        >
          <div class="notification__icon">
            <span v-if="notification.type === 'success'">✅</span>
            <span v-else-if="notification.type === 'error'">❌</span>
            <span v-else-if="notification.type === 'warning'">⚠️</span>
            <span v-else>ℹ️</span>
          </div>
          <div class="notification__text">
            <slot>{{ notification.message }}</slot>
          </div>
          <button
            v-if="notification.closable !== false"
            class="notification__close"
            @click="remove(notification.id)"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/store/notification/useNotification";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const store = useNotificationStore();
const { notifications } = storeToRefs(store);
const { remove } = store;

watch(
  notifications,
  (newNotifications) => {
    newNotifications.forEach((notification) => {
      if (notification.duration && notification.duration > 0) {
        setTimeout(() => {
          remove(notification.id);
        }, notification.duration);
      }
    });
  },
  { deep: true }
);
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification {
  min-width: 300px;
  max-width: 400px;
}

.notification__content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px) saturate(1.2);
  background-color: rgba(30, 41, 59, 0.85);
  color: #f9fafb;
  position: relative;
  overflow: hidden;
}

.notification__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

/* --- Кольори іконок для різних типів повідомлень --- */
.notification__content.notification--success .notification__icon {
  color: #22c55e;
}

.notification__content.notification--error .notification__icon {
  color: #ef4444;
}

.notification__content.notification--warning .notification__icon {
  color: #facc15;
}

.notification__content.notification--info .notification__icon {
  color: #3b82f6;
}

.notification__text {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
}

.notification__close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.notification__close:hover {
  opacity: 1;
}

/* --- Типи повідомлень --- */
.notification--success {
  border-left: 4px solid #22c55e;
  background-color: rgba(22, 101, 52, 0.8);
  color: #dcfce7;
}

.notification--error {
  border-left: 4px solid #ef4444;
  background-color: rgba(127, 29, 29, 0.8);
  color: #fee2e2;
}

.notification--warning {
  border-left: 4px solid #facc15;
  background-color: rgba(113, 63, 18, 0.8);
  color: #fef9c3;
}

.notification--info {
  border-left: 4px solid #3b82f6;
  background-color: rgba(30, 58, 138, 0.8);
  color: #dbeafe;
}

/* --- Анімації --- */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

.notification-move {
  transition: transform 0.4s ease;
}
</style>
