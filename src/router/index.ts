import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import UsersView from "@/views/admin/UsersView.vue";
import ModerationView from "@/views/admin/ModerationView.vue";
import UserProfileView from "@/views/user/ProfileView.vue";

const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/about", component: AboutView, name: "about" },
  { path: "/admin/users", component: UsersView, name: "admin-users" },
  {
    path: "/admin/moderation",
    component: ModerationView,
    name: "admin-moderation",
  },
  { path: "/user/profile", component: UserProfileView, name: "user-profile" },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
