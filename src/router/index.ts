import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import CategoryView from "@/views/adminPages/CategoryView.vue";
import UserProfileView from "@/views/UserProfileView.vue";

const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/about", component: AboutView, name: "about" },

  {
    path: "/categories-admin",
    component: CategoryView,
    name: "categories-admin",
  },
  {
    path: "/user-profile",
    component: UserProfileView,
    name: "user-profile",
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
