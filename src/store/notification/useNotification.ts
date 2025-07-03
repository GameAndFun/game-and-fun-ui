import { defineStore } from "pinia";

export interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  closable?: boolean;
}

const defaultOptions = {
  duration: 10000,
  closable: true,
};

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as Notification[],
    nextId: 1,
  }),

  actions: {
    add(notification: Omit<Notification, "id">) {
      const id = this.nextId++;
      this.notifications.push({ ...notification, id });
      return id;
    },

    remove(id: number) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },

    success(
      message: string,
      options?: Partial<Omit<Notification, "id" | "type" | "message">>
    ) {
      const mergedOptions = { ...defaultOptions, ...options };
      return this.add({ message, type: "success", ...mergedOptions });
    },

    error(
      message: string,
      options?: Partial<Omit<Notification, "id" | "type" | "message">>
    ) {
      const mergedOptions = { ...defaultOptions, ...options };
      return this.add({ message, type: "error", ...mergedOptions });
    },

    warning(
      message: string,
      options?: Partial<Omit<Notification, "id" | "type" | "message">>
    ) {
      const mergedOptions = { ...defaultOptions, ...options };
      return this.add({ message, type: "warning", ...mergedOptions });
    },

    info(
      message: string,
      options?: Partial<Omit<Notification, "id" | "type" | "message">>
    ) {
      const mergedOptions = { ...defaultOptions, ...options };
      return this.add({ message, type: "info", ...mergedOptions });
    },
  },
});
